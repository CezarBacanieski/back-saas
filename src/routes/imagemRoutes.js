import express from 'express';
import { upload } from '../middleware/multer.js';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/ImagemModel.js';

const router = express.Router();

// Rota para buscar usuário por nome
router.get('/buscarImagemPorNome/:name', async (req, res) => {
  try {
    const { name } = req.params;

    // Usando uma expressão regular para garantir a correspondência insensível a maiúsculas/minúsculas
    let user = await User.findOne({ name: new RegExp('^' + name + '$', 'i') });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Imagem não encontrada' });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar imagem por nome',
      error: err.message,
    });
  }
});

// Rota para buscar todas as imagens
router.get('/todasImagens', async (req, res) => {
  try {
    let images = await User.find();

    if (images.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Nenhuma imagem encontrada' });
    }

    res.json({ success: true, data: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar imagens',
      error: err.message,
    });
  }
});

// Rota para upload de imagens
router.post('/upload', upload.single('file'), async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    // Salva a URL segura e o nome do cliente no banco de dados
    const newUser = new User({
      name: req.body.name.trim(),
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'Uploaded!',
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer upload da imagem',
      error: err.message,
    });
  }
});

router.put(
  '/atualizarImagem/:name',
  upload.single('file'),
  async (req, res) => {
    try {
      const { name } = req.params;

      // Encontrar o usuário pelo nome
      let user = await User.findOne({
        name: new RegExp('^' + name + '$', 'i'),
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'Usuário não encontrado' });
      }

      // Deletar imagem anterior do Cloudinary
      if (user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }

      // Fazer o upload da nova imagem para o Cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }

      // Atualizar os dados do usuário
      const data = {
        name: req.body.name || user.name,
        avatar: result?.secure_url || user.avatar,
        cloudinary_id: result?.public_id || user.cloudinary_id,
      };

      // Atualizar o documento no MongoDB
      user = await User.findOneAndUpdate({ name: name }, data, { new: true });

      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar imagem',
        error: err.message,
      });
    }
  }
);

// Rota para deletar imagem por nome
router.delete('/deletar/:name', async (req, res) => {
  try {
    const { name } = req.params;

    let user = await User.findOne({ name: name.trim() });

    if (!user) {
      return res.status(404).json({ message: 'Imagem não encontrada' });
    }

    // Deletar imagem do Cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);

    // Deletar usuário do banco de dados
    await User.deleteOne({ _id: user._id });

    res.json({ message: 'Imagem deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar imagem: ' + err.message });
  }
});

export default router;

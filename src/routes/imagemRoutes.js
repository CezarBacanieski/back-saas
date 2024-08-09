import express from 'express';
import { upload } from '../middleware/multer.js';
import cloudinary from '../utils/cloudinary.js';
import User from '../models/ImagemModel.js';

const router = express.Router();

router.post('/upload', upload.single('file'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Error',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Uploaded!',
      data: result,
    });
  });
});

router.get('/todasImagens', async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/deletar/:id', async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put('/atualizar/:id', upload.single('file'), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get('/imagem/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ imageUrl: user.avatar }); // retorna a URL da imagem
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving image' });
  }
});

export default router;

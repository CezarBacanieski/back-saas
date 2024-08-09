import fs from 'fs';
import ImagemModel from '../models/ImagemModel.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

class ImagemController {
	// static salvarImagem = async (req, res) => {
	// 	try {
	// 		const imageFile = ImagemModel({
	// 			filename: req.file.filename,
	// 			filepath: req.file.path,
	// 		});
	// 		const savedImage = await imageFile.save();

	// 		res.status(200).send('imagem salva com sucesso' + savedImage);
	// 	} catch (error) {
	// 		res.status(500).send('erro ao salvar imagem' + error);
	// 	}
	// };

	static buscarImagem = async (req, res) => {
		try {
			const { filename } = req.params;
			const imagem = await ImagemModel.findOne({ filename: filename });

			if (!imagem) {
				return res.status(404).send('Imagem não encontrada');
			}

			const __filename = fileURLToPath(import.meta.url);
			const __dirname = dirname(__filename);
			const imagePath = path.join(__dirname, '../../', imagem.filepath);

			console.log('Caminho do arquivo de imagem:', imagePath);

			res.sendFile(imagePath, (err) => {
				if (err) {
					console.log('Erro ao enviar o arquivo:', err);
					res.status(500).send('Erro ao buscar imagem');
				}
			});
		} catch (error) {
			res.status(500).send('Erro ao buscar imagem: ' + error);
		}
	};


	static deletarImagem = async (req, res) => {
		try {
			const { filename } = req.params;

			const imagemExistente = await ImagemModel.findOneAndDelete({
				filename: filename,
			});

			if (!imagemExistente) {
				return res.status(404).send('Imagem não encontrada');
			}

			// Remove o arquivo físico
			fs.unlink(imagemExistente.filepath, (err) => {
				if (err) {
					console.error('Erro ao deletar o arquivo:', err);
					return res.status(500).send('Erro ao deletar imagem');
				}

				res.status(200).send('Imagem deletada com sucesso!' + imagemExistente);
			});
		} catch (error) {
			res.status(500).send('erro ao deletar imagem' + error);
		}
	};
}

export default ImagemController;

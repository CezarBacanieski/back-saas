import express from 'express';
import { upload } from '../js/upload.js';
import ImagemController from '../controllers/imagemController.js';

const router = express.Router();

router.get('/buscarImagem/:filename', ImagemController.buscarImagem);

router.post(
	'/salvarImagem',
	upload.single('file'),
	ImagemController.salvarImagem
);

router.put(
	'/atualizarImagem/:filename',
	upload.single('file'),
	ImagemController.atualizarImagem
);

router.delete('/deletarImagem/:filename', ImagemController.deletarImagem);

export default router;

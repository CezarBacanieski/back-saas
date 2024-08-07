import express from 'express';
import ClienteController from '../controllers/clienteController.js';

const router = express.Router();

router.get(
	'/buscarClientePorNome/:nome',
	ClienteController.buscarClientePorNome
);
router.post(
	'/salvarCliente',

	ClienteController.salvarDadosCliente
);

router.put(
	'/atualizarDadosDoCliente/:nome',
	ClienteController.atualizarDadosDoCliente
);
router.delete('/excluirCliente/:nome', ClienteController.excluirCliente);

export default router;

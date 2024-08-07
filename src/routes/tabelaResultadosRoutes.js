import express from 'express';
import TabelaController from '../controllers/tabelaController.js';

const router = express.Router();

router.get('/todosResultados', TabelaController.buscarTodasTabelaResultado);
router.get('/buscarPorNome/:nome', TabelaController.buscarTabelaPorNome);
router.post('/salvar', TabelaController.enviarResultados);
router.delete('/excluirTabelaPorNome/:nome', TabelaController.excluirTabelaPorNome);

export default router;

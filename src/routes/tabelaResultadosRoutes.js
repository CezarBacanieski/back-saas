import express from 'express';
import TabelaController from '../controllers/tabelaController.js';

const router = express.Router();

router.get('/todosResultados', TabelaController.buscarTodasTabelaResultado);
router.get('/buscarTabelaPorNome/:nome', TabelaController.buscarTabelaPorNome);
router.post('/salvar', TabelaController.enviarResultados);
router.put('/atualizarLinha/:id', TabelaController.atualizarLinha);
router.delete(
  '/excluirTabelaPorNome/:nome',
  TabelaController.excluirTabelaPorNome
);
router.delete('/excluirLinha/:id', TabelaController.excluirLinha);

export default router;

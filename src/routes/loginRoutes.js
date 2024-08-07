import express from 'express';
import LoginController from '../controllers/loginController.js';
import { checarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', LoginController.realizarLogin);
router.post('/registrar', LoginController.realizarRegistro);
// rota privada
router.get('/user/:id', checarToken, LoginController.rotaPrivada);

export default router;

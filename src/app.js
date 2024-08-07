import express from 'express';
// import cors from 'cors';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir acesso de qualquer origem
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  ); // Métodos permitidos
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  ); // Headers permitidos
  res.setHeader('Access-Control-Allow-Credentials', true); // Permitir credenciais (cookies, headers de autenticação)

  // Permitir métodos OPTIONS sem serem bloqueados
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/uploads', express.static(join(__dirname, '../../back-saas/uploads')));

app.use(express.json());

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('conexão com o banco feita com sucesso');
});

routes(app);

export default app;

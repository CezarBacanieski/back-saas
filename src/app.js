import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware para CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir acesso de qualquer origem
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  ); // Métodos permitidos
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  ); // Headers permitidos
  res.setHeader('Access-Control-Allow-Credentials', true); // Permitir credenciais

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Servir arquivos estáticos
app.use('/uploads', express.static(join(__dirname, '../uploads'))); // Ajuste o caminho conforme necessário

app.use(express.json());

// Conexão com o banco de dados
db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

// Configuração das rotas
routes(app);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

export default app;

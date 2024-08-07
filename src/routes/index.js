import express from 'express';
import tabelaResultadosRoutes from './tabelaResultadosRoutes.js';
import loginRoutes from './loginRoutes.js';
import clienteRoutes from './clienteRoutes.js';
import imagemRoutes from './imagemRoutes.js';

const routes = (app) => {
	app.route('/').get((req, res) => {
		res.status(200).send({ titulo: 'Saas Eletrica' });
	});

	app.use(
		express.json(),
		tabelaResultadosRoutes,
		loginRoutes,
		clienteRoutes,
		imagemRoutes
	);
};

export default routes;

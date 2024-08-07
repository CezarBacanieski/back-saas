import { tabelaResultadosModel } from '../models/index.js';

class TabelaController {
	static buscarTodasTabelaResultado = async (req, res) => {
		try {
			const todasAsTabelasResultado = await tabelaResultadosModel.find({});
			res.status(200).json(todasAsTabelasResultado);
		} catch (erro) {
			res
				.status(404)
				.json({ message: 'falha ao buscar todas as tabelas' + erro });
		}
	};

	static buscarTabelaPorNome = async (req, res) => {
		try {
			const nome = req.params.nome;
			const tabelaResultadoBuscaPorNome = await tabelaResultadosModel.find({
				nome: nome,
			});
			res.status(200).json(tabelaResultadoBuscaPorNome);
		} catch (erro) {
			res
				.status(404)
				.json({ message: 'falha ao buscar tabela por nome' + erro });
		}
	};

	static excluirTabelaPorNome = async (req, res) => {
		try {
			const { nome } = req.params;
			const tabelaParaSerExcluida = await tabelaResultadosModel.deleteMany({
				nome: nome,
			});
			if (tabelaParaSerExcluida.deletedCount > 0) {
				res.status(200).json({
					message: `Tabelas com o nome '${nome}' excluídas com sucesso.`,
				});
			} else {
				res.status(404).send('Não foi encontrada tabela com esse nome');
			}

			// outro metodo que pode ser usado
			// const tabelaParaSerExcluida = await tabelaResultadosModel.find({
			// 	nome: nome,
			// });

			// if (tabelaParaSerExcluida.length > 0) {
			// 	const deletions = tabelaParaSerExcluida.map(async (tabela) => {
			// 		return await tabelaResultadosModel.deleteOne({ _id: tabela._id });
			// 	});

			// 	await Promise.all(deletions);
			// 	res.status(200).json({
			// 		message:
			// 			`Tabelas com o nome ${nome} excluida com sucesso: ` +
			// 			tabelaParaSerExcluida,
			// 	});
		} catch (erro) {
			res
				.status(500)
				.json({ message: 'Erro ao excluir tabela por nome' + erro });
		}
	};

	static enviarResultados = async (req, res) => {
		try {
			const nome = req.body.nome;
			const itensTabela = req.body.itens;

			const tabelaResultadoComNome = itensTabela.map((item) => ({
				...item,
				nome,
			}));
			await tabelaResultadosModel.insertMany(tabelaResultadoComNome);
			res.status(200).json({ message: 'Tabela salva com sucesso' });
		} catch (erro) {
			res.status(500).json({
				message: `Erro ao enviar resultados da tabela ${erro.message} `,
			});
		}
	};
}

export default TabelaController;

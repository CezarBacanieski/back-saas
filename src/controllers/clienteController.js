import clienteModel from '../models/clienteModel.js';

class ClienteController {
	static buscarClientePorNome = async (req, res) => {
		try {
			const { nome } = req.params;
			const resultadoBuscaCliente = await clienteModel.findOne({ nome: nome });
			res.status(200).json(resultadoBuscaCliente);
		} catch (error) {
			res.status(404).send('cliente nao encontrado' + error);
		}
	};

	static salvarDadosCliente = async (req, res) => {
		try {
			const clienteData = {
				nome: req.body.nome,
				unidade: req.body.unidade,
				data: req.body.data,
				contratante: req.body.contratante,
				localInspecao: req.body['local-inspecao'],
				cidade: req.body.cidade,
				horarioAdministrativo: req.body['horario-funcionamento'],
				horarioProducao: req.body.producao,
				colaborador: req.body.colaborador,
				descricaoEmpresa: req.body['descricao-empresa'],
				concepcaoSistemaEnergetico: req.body['concepcao-sistema'],
			};

			const novoCliente = new clienteModel(clienteData);
			await novoCliente.save();

			res.status(201).json({ message: 'Dados do cliente salvos com sucesso!' });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Erro ao salvar dados do cliente' + error });
		}
	};

	static atualizarDadosDoCliente = async (req, res) => {
		try {
			const { nome } = req.params;

			const dadosAtualizados = req.body;

			const resultadoAtualizacao = await clienteModel.findOneAndUpdate(
				{ nome: nome },
				{ $set: dadosAtualizados },
				{ new: true }
			);
			if (resultadoAtualizacao) {
				res.status(200).json({
					message: 'Dados atualizados com sucesso!',
					cliente: resultadoAtualizacao,
				});
			} else {
				res.status(404).send('Cliente não encontrado');
			}
		} catch (error) {
			res.status(500).send('Erro ao atualizar os dados do cliente' + error);
		}
	};

	static excluirCliente = async (req, res) => {
		const { nome } = req.params;

		await clienteModel.deleteMany({ nome: nome });

		res.status(200).send('Cliente excluido com sucesso');
	};
}

export default ClienteController;

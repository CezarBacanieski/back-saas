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
      const { nome } = req.params.nome;
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

  static excluirLinha = async (req, res) => {
    try {
      const { id } = req.params;
      await tabelaResultadosModel.findByIdAndDelete(id);

      res.status(200).send('Linha excluida com sucesso');
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir linha', error });
    }
  };

  static atualizarLinha = async (req, res) => {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const response = await tabelaResultadosModel.findByIdAndUpdate(
        id,
        { $set: dadosAtualizados },
        { new: true }
      );

      res
        .status(200)
        .json({ message: 'Dados da linha atualizados com sucesso', response });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar linha' + error });
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

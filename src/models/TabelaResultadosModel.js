import mongoose from 'mongoose';

const TabelaSchema = new mongoose.Schema({
	nome: { type: String },
	classificacao: { type: String },
	setor: { type: String },
	descricao: { type: String },
	quantidadeItens: { type: Number },
	potenciaUnit: { type: Number },
	horasTotaisDia: { type: Number },
	diasSemana: { type: Number },
	horasTotaisMes: { type: Number },
	totalWattHora: { type: Number },
	totalKwMes: { type: Number },
	percentualUtilizado: { type: Number },
});

const tabelaResultadosModel = mongoose.model('Tabela', TabelaSchema);

export default tabelaResultadosModel;

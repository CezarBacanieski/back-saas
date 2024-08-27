import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, unique: true, required: true },
  unidade: { type: String },
  data: { type: String },
  contratante: { type: String },
  localInspecao: { type: String },
  cidade: { type: String },
  horarioAdministrativo: { type: String },
  horarioProducao: { type: String },
  colaborador: { type: String },
  descricaoEmpresa: { type: String },
  concepcaoSistemaEnergetico: { type: String },
});

const clienteModel = mongoose.model('Cliente', ClienteSchema);

export default clienteModel;

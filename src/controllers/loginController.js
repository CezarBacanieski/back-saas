import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {
	static realizarRegistro = async (req, res) => {
		const { usuario, senha } = req.body;

		if (!usuario) {
			return res
				.status(403)
				.json({ message: 'É obrigatório colocar o usuário!' });
		}

		if (!senha) {
			return res
				.status(403)
				.json({ message: 'É obrigatório colocar a senha!' });
		}

		// checar se um usuário já existe
		const userExists = await User.findOne({ usuario });

		if (userExists) {
			return res
				.status(422)
				.json({ message: 'Usuário já cadastrado no banco de dados' });
		}

		try {
			// Garantindo que a senha é uma string
			const salt = await bcrypt.genSalt(12);
			const passwordHash = await bcrypt.hash(senha.toString(), salt);

			// Criar usuário
			const user = new User({
				usuario,
				senha: passwordHash,
			});

			await user.save();
			res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
		} catch (erro) {
			res
				.status(500)
				.json({ message: 'Erro ao cadastrar', error: erro.message });
		}
	};

	static realizarLogin = async (req, res) => {
		const { usuario, senha } = req.body;

		if (!usuario) {
			return res
				.status(403)
				.json({ message: 'É obrigatório colocar o usuário!' });
		}

		if (!senha) {
			return res
				.status(403)
				.json({ message: 'É obrigatório colocar a senha!' });
		}

		const user = await User.findOne({ usuario });
		if (!user) {
			return res.status(404).json({ message: 'Usuário não encontrado!' });
		}

		const checarSenha = await bcrypt.compare(senha, user.senha);
		if (!checarSenha) {
			return res.status(422).json({ message: 'Senha inválida!' });
		}

		try {
			const secret = process.env.SECRET;
			const token = jwt.sign({ id: user._id }, secret);
			res.status(200).json({ message: 'Login realizado com sucesso', token });
		} catch (erro) {
			res
				.status(500)
				.json({ message: 'Erro ao fazer login', error: erro.message });
		}
	};

	static rotaPrivada = async (req, res) => {
		const id = req.params.id;

		const user = await User.findById(id, '-senha');

		if (!user) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}

		res.status(200).json(user);
	};
}

export default LoginController;

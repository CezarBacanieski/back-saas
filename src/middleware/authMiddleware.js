import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const checarToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Acesso negado!' });
	}

	try {
		const secret = process.env.SECRET;
		const decoded = jwt.verify(token, secret);
		req.userId = decoded.id;
		next();
	} catch (error) {
		res.status(403).json({ message: 'Token inválido!' });
	}
};

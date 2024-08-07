import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	usuario: { type: String, required: true },
	senha: { type: String, required: true },
});

const User = mongoose.model('Login', UserSchema);

export default User;

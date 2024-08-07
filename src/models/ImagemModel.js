import mongoose from 'mongoose';

const ImagemSchema = new mongoose.Schema({
	filename: { type: String },
	filepath: { type: String },
});

const ImagemModel = mongoose.model('Image', ImagemSchema);

export default ImagemModel;

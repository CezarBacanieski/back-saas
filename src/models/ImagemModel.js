import mongoose from 'mongoose';

const ImagemSchema = new mongoose.Schema({
  // filename: { type: String },
  // filepath: { type: String },

  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});

const User = mongoose.model('Image', ImagemSchema);

export default User;

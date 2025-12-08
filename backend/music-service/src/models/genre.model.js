const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imageUrl: { type: String, default: 'https://placehold.co/400?text=Genre' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Genre', genreSchema);
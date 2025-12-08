const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  coverUrl: { type: String, default: 'https://placehold.co/400' },
  releaseDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
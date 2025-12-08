const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: false },
  genre: { type: String, required: false }, 
  coverUrl: { type: String, default: 'https://placehold.co/400' },
  duration: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
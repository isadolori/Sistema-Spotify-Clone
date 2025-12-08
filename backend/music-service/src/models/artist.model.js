const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, default: 'https://placehold.co/400' },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
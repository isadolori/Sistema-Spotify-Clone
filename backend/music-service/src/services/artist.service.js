const Artist = require('../models/artist.model');

class ArtistService {
  async findAll(params = {}) {
    return await Artist.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Artist.findById(id);
  }

  async create(data) {
    return await Artist.create(data);
  }
}

module.exports = new ArtistService();
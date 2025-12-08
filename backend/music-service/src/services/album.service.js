const Album = require('../models/album.model');

class AlbumService {
  async findAll(params = {}) {
    return await Album.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Album.findById(id);
  }

  async create(data) {
    return await Album.create(data);
  }
}

module.exports = new AlbumService();
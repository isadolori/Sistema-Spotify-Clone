const Song = require('../models/song.model');

class SongService {
  
  async findAll(params = {}) {
    const { search } = params;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { artist: { $regex: search, $options: 'i' } },
          { album: { $regex: search, $options: 'i' } }
        ]
      };
    }

    return await Song.find(query).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Song.findById(id);
  }

  async create(data) {
    return await Song.create(data);
  }
}

module.exports = new SongService();
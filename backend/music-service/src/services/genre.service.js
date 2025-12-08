const Genre = require('../models/genre.model');

class GenreService {
  async findAll() {
    return await Genre.find().sort({ name: 1 });
  }
  
  async findById(id) {
    return await Genre.findById(id);
  }
  
  async create(data) {
    return await Genre.create(data);
  }
}

module.exports = new GenreService();
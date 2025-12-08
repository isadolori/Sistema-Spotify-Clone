const songService = require('../services/song.service');

const songsController = {
  listSongs: async (req, res) => {
    try {
      const songs = await songService.findAll(req.query);
      
      return res.status(200).json({
        data: songs.map(song => ({
          id: song._id,
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
          coverUrl: song.coverUrl,
          duration: song.duration
        }))
      });
    } catch (error) {
      console.error('Erro no controller:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar músicas' });
    }
  },

  getSongById: async (req, res) => {
    try {
      const song = await songService.findById(req.params.id);
      if (!song) return res.status(404).json({ error: 'Música não encontrada' });
      
      return res.status(200).json({
        data: {
          id: song._id,
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
          coverUrl: song.coverUrl,
          duration: song.duration
        }
      });
    } catch (error) {
      console.error('Erro ao buscar canção:', error);
      return res.status(500).json({ error: 'Erro ao buscar detalhes da música' });
    }
  },

  createSong: async (req, res) => {
    try {
      const { title, artist, duration } = req.body;
      if (!title || !artist || !duration) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      }
      
      const newSong = await songService.create(req.body);
      return res.status(201).json(newSong);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar música' });
    }
  }
};

module.exports = songsController;
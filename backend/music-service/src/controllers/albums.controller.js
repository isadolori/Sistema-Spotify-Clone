const albumService = require('../services/album.service');

exports.listAlbums = async (req, res) => {
    try {
        const albums = await albumService.findAll(req.query);
        
        return res.status(200).json({
            data: albums.map(album => ({
                id: album._id,
                title: album.title,
                artist: album.artist,
                coverUrl: album.coverUrl,
                releaseDate: album.releaseDate
            }))
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar álbuns' });
    }
};

exports.getAlbumById = async (req, res) => {
    try {
        const album = await albumService.findById(req.params.id);
        if (!album) return res.status(404).json({ error: 'Álbum não encontrado' });
        return res.status(200).json({
            data: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                coverUrl: album.coverUrl,
                releaseDate: album.releaseDate
            }
        });
    } catch (error) {
        console.error('Erro ao buscar álbum:', error);
        return res.status(500).json({ error: 'Erro interno' });
    }
};

exports.createAlbum = async (req, res) => {
    try {
        const album = await albumService.create(req.body);
        return res.status(201).json(album);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar álbum' });
    }
};
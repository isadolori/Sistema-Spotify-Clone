const artistService = require('../services/artist.service');

exports.listArtists = async (req, res) => {
    try {
        const artists = await artistService.findAll(req.query);
        
        return res.status(200).json({
            data: artists.map(artist => ({
                id: artist._id,
                name: artist.name,
                imageUrl: artist.imageUrl,
                verified: artist.verified
            }))
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar artistas' });
    }
};

exports.getArtistById = async (req, res) => {
    try {
        const artist = await artistService.findById(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artista não encontrado' });
        return res.status(200).json({
            data: {
                id: artist._id,
                name: artist.name,
                imageUrl: artist.imageUrl,
                verified: artist.verified
            }
        });
    } catch (error) {
        console.error('Erro ao buscar artista:', error);
        return res.status(500).json({ error: 'Erro interno' });
    }
};

exports.createArtist = async (req, res) => {
    try {
        const artist = await artistService.create(req.body);
        return res.status(201).json(artist);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar artista' });
    }
};
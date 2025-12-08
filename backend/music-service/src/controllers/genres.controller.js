const genreService = require('../services/genre.service');

exports.listGenres = async (req, res) => {
    try {
        const genres = await genreService.findAll();
        
        return res.status(200).json({
            data: genres.map(genre => ({
                id: genre._id,
                name: genre.name,
                imageUrl: genre.imageUrl,
                description: genre.description
            }))
        });
    } catch (error) {
        console.error('Erro ao listar gêneros:', error);
        return res.status(500).json({ error: 'Erro ao buscar gêneros' });
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await genreService.findById(req.params.id);
        
        if (!genre) {
            return res.status(404).json({ error: 'Gênero não encontrado' });
        }
        
        return res.status(200).json({
            data: {
                id: genre._id,
                name: genre.name,
                imageUrl: genre.imageUrl,
                description: genre.description
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar gênero' });
    }
};

exports.createGenre = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Nome do gênero é obrigatório' });
        }

        const genre = await genreService.create(req.body);
        return res.status(201).json(genre);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar gênero' });
    }
};
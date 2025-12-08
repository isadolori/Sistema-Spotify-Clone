const express = require('express');
const router = express.Router();
const controller = require('../controllers/genres.controller');

router.get('/', controller.listGenres);
router.get('/:id', controller.getGenreById);
router.post('/', controller.createGenre);

module.exports = router;
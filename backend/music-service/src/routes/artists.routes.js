const express = require('express');
const router = express.Router();
const controller = require('../controllers/artists.controller');

router.get('/', controller.listArtists);
router.get('/:id', controller.getArtistById);
router.post('/', controller.createArtist);

module.exports = router;
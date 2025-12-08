const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs.controller');

router.get('/', songsController.listSongs);
router.get('/:id', songsController.getSongById);
router.post('/', songsController.createSong);

module.exports = router;
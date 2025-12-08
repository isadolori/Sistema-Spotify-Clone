const express = require('express');
const router = express.Router();
const controller = require('../controllers/albums.controller');

router.get('/', controller.listAlbums);
router.get('/:id', controller.getAlbumById);
router.post('/', controller.createAlbum);

module.exports = router;
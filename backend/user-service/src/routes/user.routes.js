// backend/user-service/src/routes/user.routes.js

const express = require('express');
const UserController = require('../controllers/UserController'); 

const router = express.Router();

router.post('/register', UserController.register);

module.exports = router;
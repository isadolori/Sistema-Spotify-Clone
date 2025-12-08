// backend/user-service/src/controllers/UserController.js

const UserService = require('../services/UserService'); 

const UserController = {
    async register(req, res) {
        try {
            const newUser = await UserService.registerNewUser(req.body);
            return res.status(201).json({
                message: 'User registered successfully.',
                user: newUser 
            });
        } catch (error) {
            console.error('Registration error:', error.message);
            if (error.message === 'Email already in use.') {
                return res.status(409).json({ error: 'Conflict: Email already registered.' }); 
            }
            return res.status(500).json({ error: 'Internal server error during registration.' });
        }
    },

    async login(req, res) {
        try {
            const user = await UserService.authenticateUser(req.body);
            return res.status(200).json({
                message: 'Login successful.',
                user
            });
        } catch (error) {
            console.error('Login error:', error.message);
            if (error.message === 'User not found.' || error.message === 'Invalid password.') {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
            return res.status(500).json({ error: 'Internal server error during login.' });
        }
    },
};

module.exports = UserController;
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/user.routes'); 

const app = express();
const PORT = process.env.PORT || 3002; 
const MONGO_URI = 'mongodb://localhost:27017/spotify_users_db'; 

app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('User Database connected successfully!');
        
        app.use('/api/auth', userRoutes); 

        app.listen(PORT, () => {
            console.log(`User Registration Service running on port ${PORT}`);
            console.log(`Endpoint: http://localhost:${PORT}/api/auth/register`);
        });

    })
    .catch(err => {
        console.error('FATAL ERROR: Could not connect to database.', err);
        process.exit(1); 
    });
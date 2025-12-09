const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/user.routes');
const errorMiddleware = require('./src/middleware/error.middleware');

// Configurações
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; 
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spotify_users_db'; 

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ User Database connected successfully!');
        
        app.use('/api/auth', userRoutes); 

        // Health check endpoint
        app.get('/health', (req, res) => {
            res.status(200).json({ status: 'User Service Online' });
        });

        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ error: 'Endpoint not found.' });
        });

        // Error middleware
        app.use(errorMiddleware);

        app.listen(PORT, () => {
            console.log(`✅ User Authentication Service running on port ${PORT}`);
            console.log(`📍 Register: http://localhost:${PORT}/api/auth/register`);
            console.log(`📍 Login: http://localhost:${PORT}/api/auth/login`);
            console.log(`📍 Health: http://localhost:${PORT}/health`);
        });
    })
    .catch(err => {
        console.error('❌ FATAL ERROR: Could not connect to database.', err);
        process.exit(1); 
    });
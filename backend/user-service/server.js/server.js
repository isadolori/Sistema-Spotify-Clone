// backend/user-service/server.js

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/user.routes'); 

const app = express();
// Porta 3001, exclusiva para o serviço de usuário
const PORT = process.env.PORT || 3001; 
// URI de conexão ao MongoDB (banco de dados spotify_users_db)
const MONGO_URI = 'mongodb://localhost:27017/spotify_users_db'; 

// Middleware para que o Express entenda JSON nas requisições POST
app.use(express.json());

// --- Conexão com o Banco de Dados (MongoDB) ---
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('User Database connected successfully!');
        
        // Define o prefixo '/api/users' para todas as rotas de usuário
        app.use('/api/users', userRoutes); 

        // Inicia o Servidor
        app.listen(PORT, () => {
            console.log(`User Registration Service running on port ${PORT}`);
            console.log(`Endpoint: http://localhost:${PORT}/api/users/register`);
        });

    })
    .catch(err => {
        console.error('FATAL ERROR: Could not connect to database.', err);
        // Encerra o processo se a conexão falhar
        process.exit(1); 
    });
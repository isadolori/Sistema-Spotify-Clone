const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorMiddleware = require('./middleware/error.middleware');

// Configurações
dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const songsRoutes = require('./routes/songs.routes');
const artistsRoutes = require('./routes/artists.routes');
const albumsRoutes = require('./routes/albums.routes');
const genresRoutes = require('./routes/genres.routes');

app.use('/api/songs', songsRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/genres', genresRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'Music Service Online', env: process.env.NODE_ENV });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Music Service rodando na porta ${PORT}`);
});
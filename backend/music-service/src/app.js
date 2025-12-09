const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorMiddleware = require('./middleware/error.middleware');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const songsRoutes = require('./routes/songs.routes');
const artistsRoutes = require('./routes/artists.routes');
const albumsRoutes = require('./routes/albums.routes');
const genresRoutes = require('./routes/genres.routes');

app.use('/api/songs', songsRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/genres', genresRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Music Service Online' });
});

app.get('/', (req, res) => {
  res.json({ 
    service: 'Music Service',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      songs: '/api/songs',
      artists: '/api/artists',
      albums: '/api/albums',
      genres: '/api/genres',
      health: '/health'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Music Service running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
});
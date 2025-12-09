const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const MICROSERVICES = {
  // Microsserviço de Música
  MUSIC_SERVICE: {
    BASE_URL: process.env.REACT_APP_MUSIC_SERVICE_URL || 'http://localhost:3001',
    ENDPOINTS: {
      SONGS: '/api/songs',
      ARTISTS: '/api/artists',
      ALBUMS: '/api/albums',
      GENRES: '/api/genres',
      PLAYLISTS: '/api/playlists',
    }
  },

  // Microsserviço de Usuários/Clientes
  USER_SERVICE: {
    BASE_URL: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:3002',
    ENDPOINTS: {
      USERS: '/api/users',
      AUTH: '/api/auth',
      PROFILE: '/api/profile',
    }
  },
};

export const API_TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
};

export default {
  MICROSERVICES,
  API_TIMEOUTS,
};

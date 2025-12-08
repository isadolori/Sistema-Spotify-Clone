/**
 * Configuração centralizada de URLs dos microsserviços
 * Permite fácil mudança entre ambientes (dev, staging, prod)
 */

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
  SHORT: 5000,    // 5 segundos
  MEDIUM: 15000,  // 15 segundos
  LONG: 30000,    // 30 segundos
};

export default {
  MICROSERVICES,
  API_TIMEOUTS,
};

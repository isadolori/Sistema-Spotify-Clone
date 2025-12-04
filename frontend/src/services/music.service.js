/**
 * Serviço de Música - Comunicação com o microsserviço de música
 * Responsável por todas as operações relacionadas a músicas, artistas, álbuns, etc
 */

import apiService from './api.service';
import { MICROSERVICES } from '../config/api.config';

const BASE_URL = MICROSERVICES.MUSIC_SERVICE.BASE_URL;
const ENDPOINTS = MICROSERVICES.MUSIC_SERVICE.ENDPOINTS;

class MusicService {
  /**
   * Listar todas as músicas com paginação e filtros
   */
  async listSongs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.SONGS}${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de uma música específica
   */
  async getSongById(songId) {
    const url = `${BASE_URL}${ENDPOINTS.SONGS}/${songId}`;
    return apiService.get(url);
  }

  /**
   * Buscar músicas
   */
  async searchSongs(query) {
    return this.listSongs({ search: query });
  }

  /**
   * Listar todas as músicas de um artista
   */
  async getSongsByArtist(artistId, params = {}) {
    return this.listSongs({ ...params, artistId });
  }

  /**
   * Listar todas as músicas de um álbum
   */
  async getSongsByAlbum(albumId, params = {}) {
    return this.listSongs({ ...params, albumId });
  }

  /**
   * Listar todas as músicas de um gênero
   */
  async getSongsByGenre(genreId, params = {}) {
    return this.listSongs({ ...params, genreId });
  }

  /**
   * Obter top músicas
   */
  async getTopSongs(params = { limit: 10 }) {
    return this.listSongs({ ...params, sort: 'trending' });
  }

  /**
   * Obter músicas recomendadas
   */
  async getRecommendedSongs(params = { limit: 10 }) {
    const url = `${BASE_URL}${ENDPOINTS.SONGS}/recommended`;
    return apiService.get(url);
  }

  // ===== ARTISTAS =====

  /**
   * Listar todos os artistas
   */
  async listArtists(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.ARTISTS}${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de um artista
   */
  async getArtistById(artistId) {
    const url = `${BASE_URL}${ENDPOINTS.ARTISTS}/${artistId}`;
    return apiService.get(url);
  }

  /**
   * Buscar artistas
   */
  async searchArtists(query) {
    return this.listArtists({ search: query });
  }

  /**
   * Obter artistas em destaque
   */
  async getFeaturedArtists(params = { limit: 10 }) {
    return this.listArtists({ ...params, featured: true });
  }

  // ===== ÁLBUNS =====

  /**
   * Listar todos os álbuns
   */
  async listAlbums(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.ALBUMS}${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de um álbum
   */
  async getAlbumById(albumId) {
    const url = `${BASE_URL}${ENDPOINTS.ALBUMS}/${albumId}`;
    return apiService.get(url);
  }

  /**
   * Buscar álbuns
   */
  async searchAlbums(query) {
    return this.listAlbums({ search: query });
  }

  /**
   * Obter álbuns de um artista
   */
  async getAlbumsByArtist(artistId, params = {}) {
    return this.listAlbums({ ...params, artistId });
  }

  /**
   * Obter lançamentos recentes
   */
  async getRecentAlbums(params = { limit: 10 }) {
    return this.listAlbums({ ...params, sort: 'recent' });
  }

  // ===== GÊNEROS =====

  /**
   * Listar todos os gêneros
   */
  async listGenres() {
    const url = `${BASE_URL}${ENDPOINTS.GENRES}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de um gênero
   */
  async getGenreById(genreId) {
    const url = `${BASE_URL}${ENDPOINTS.GENRES}/${genreId}`;
    return apiService.get(url);
  }

  // ===== PLAYLISTS =====

  /**
   * Listar playlists curatorias
   */
  async listPlaylists(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Obter detalhes de uma playlist
   */
  async getPlaylistById(playlistId) {
    const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}/${playlistId}`;
    return apiService.get(url);
  }

  /**
   * Buscar playlists
   */
  async searchPlaylists(query) {
    return this.listPlaylists({ search: query });
  }
}

export default new MusicService();

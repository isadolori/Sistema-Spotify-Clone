import apiService from './api.service';
import { MICROSERVICES } from '../config/api.config';

const BASE_URL = MICROSERVICES.MUSIC_SERVICE.BASE_URL;
const ENDPOINTS = MICROSERVICES.MUSIC_SERVICE.ENDPOINTS;

class MusicService {
  async listSongs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.SONGS}${queryString ? '?' + queryString : ''}`;
    const response = await apiService.get(url);
    return response.data || [];
  }

  async getSongById(songId) {
    const url = `${BASE_URL}${ENDPOINTS.SONGS}/${songId}`;
    const response = await apiService.get(url);
    return response.data || response;
  }

  async searchSongs(query) {
    return this.listSongs({ search: query });
  }

  async getSongsByArtist(artistId, params = {}) {
    return this.listSongs({ ...params, artistId });
  }

  async getSongsByAlbum(albumId, params = {}) {
    return this.listSongs({ ...params, albumId });
  }

  async getSongsByGenre(genreId, params = {}) {
    return this.listSongs({ ...params, genreId });
  }

  async getTopSongs(params = { limit: 10 }) {
    return this.listSongs({ ...params, sort: 'trending' });
  }

  async getRecommendedSongs(params = { limit: 10 }) {
    const url = `${BASE_URL}${ENDPOINTS.SONGS}/recommended`;
    const response = await apiService.get(url);
    return response.data || [];
  }

  // ===== ARTISTAS =====

  async listArtists(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.ARTISTS}${queryString ? '?' + queryString : ''}`;
    const response = await apiService.get(url);
    return response.data || [];
  }

  async getArtistById(artistId) {
    const url = `${BASE_URL}${ENDPOINTS.ARTISTS}/${artistId}`;
    const response = await apiService.get(url);
    return response.data || response;
  }

  async searchArtists(query) {
    return this.listArtists({ search: query });
  }

  async getFeaturedArtists(params = { limit: 10 }) {
    return this.listArtists({ ...params, featured: true });
  }

  // ===== ÁLBUNS =====

  async listAlbums(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.ALBUMS}${queryString ? '?' + queryString : ''}`;
    const response = await apiService.get(url);
    return response.data || [];
  }

  async getAlbumById(albumId) {
    const url = `${BASE_URL}${ENDPOINTS.ALBUMS}/${albumId}`;
    const response = await apiService.get(url);
    return response.data || response;
  }

  async searchAlbums(query) {
    return this.listAlbums({ search: query });
  }

  async getAlbumsByArtist(artistId, params = {}) {
    return this.listAlbums({ ...params, artistId });
  }

  async getRecentAlbums(params = { limit: 10 }) {
    return this.listAlbums({ ...params, sort: 'recent' });
  }

  // ===== GÊNEROS =====

  async listGenres() {
    const url = `${BASE_URL}${ENDPOINTS.GENRES}`;
    const response = await apiService.get(url);
    return response.data || [];
  }

  async getGenreById(genreId) {
    const url = `${BASE_URL}${ENDPOINTS.GENRES}/${genreId}`;
    const response = await apiService.get(url);
    return response.data || response;
  }

  // ===== PLAYLISTS =====

  async listPlaylists(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}${queryString ? '?' + queryString : ''}`;
    const response = await apiService.get(url);
    return response.data || [];
  }

  async getPlaylistById(playlistId) {
    const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}/${playlistId}`;
    return apiService.get(url);
  }

  async searchPlaylists(query) {
    return this.listPlaylists({ search: query });
  }
}

export default new MusicService();
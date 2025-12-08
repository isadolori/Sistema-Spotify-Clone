import React, { createContext, useContext, useState, useCallback, useReducer } from 'react';
import musicService from '../services/music.service';

const MusicContext = createContext();

const initialState = {
  songs: [],
  artists: [],
  albums: [],
  genres: [],
  playlists: [],
  currentSong: null,
  isLoading: false,
  error: null,
};

function musicReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SONGS':
      return { ...state, songs: action.payload, isLoading: false };
    case 'SET_ARTISTS':
      return { ...state, artists: action.payload, isLoading: false };
    case 'SET_ALBUMS':
      return { ...state, albums: action.payload, isLoading: false };
    case 'SET_GENRES':
      return { ...state, genres: action.payload, isLoading: false };
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload, isLoading: false };
    case 'SET_CURRENT_SONG':
      return { ...state, currentSong: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function MusicProvider({ children }) {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  const loadSongs = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await musicService.listSongs(params);
      dispatch({ type: 'SET_SONGS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const loadArtists = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await musicService.listArtists(params);
      dispatch({ type: 'SET_ARTISTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const loadAlbums = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await musicService.listAlbums(params);
      dispatch({ type: 'SET_ALBUMS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const loadGenres = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await musicService.listGenres();
      dispatch({ type: 'SET_GENRES', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const loadPlaylists = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await musicService.listPlaylists(params);
      dispatch({ type: 'SET_PLAYLISTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const searchSongs = useCallback(async (query) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await musicService.searchSongs(query);
      dispatch({ type: 'SET_SONGS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const setCurrentSong = useCallback((song) => {
    dispatch({ type: 'SET_CURRENT_SONG', payload: song });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    loadSongs,
    loadArtists,
    loadAlbums,
    loadGenres,
    loadPlaylists,
    searchSongs,
    setCurrentSong,
    clearError,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext deve ser usado dentro de MusicProvider');
  }
  return context;
}

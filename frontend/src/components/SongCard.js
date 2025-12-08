/**
 * Componente SongCard - Card individual de música
 */

import React from 'react';
import '../styles/SongCard.css';

function SongCard({ song, onPlay, onAddToPlaylist }) {
  if (!song) return null;

  return (
    <div className="song-card">
      {song.coverUrl && (
        <div className="song-cover">
          <img src={song.coverUrl} alt={song.title} />
          <div className="overlay">
            <button className="btn-play" onClick={() => onPlay(song)}>
              ▶
            </button>
            <button className="btn-add" onClick={() => onAddToPlaylist(song)}>
              +
            </button>
          </div>
        </div>
      )}
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist || 'Artista desconhecido'}</p>
        <p className="song-album">{song.album || ''}</p>
        <span className="song-duration">{song.duration || '3:45'}</span>
      </div>
    </div>
  );
}

export default SongCard;

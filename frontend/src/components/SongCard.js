import React from 'react';
import '../styles/SongCard.css';

function SongCard({ song }) {
  if (!song) return null;

  return (
    <div className="song-card">
      {song.coverUrl && (
        <div className="song-cover">
          <img src={song.coverUrl} alt={song.title} />
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

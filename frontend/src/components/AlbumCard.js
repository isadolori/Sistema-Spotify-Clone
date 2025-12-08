/**
 * Componente AlbumCard - Card individual de álbum
 */

import React from 'react';
import '../styles/AlbumCard.css';

function AlbumCard({ album, onPlay, onViewDetails }) {
  if (!album) return null;

  return (
    <div className="album-card">
      {album.coverUrl && (
        <div className="album-cover">
          <img src={album.coverUrl} alt={album.name} />
          <div className="overlay">
            <button className="btn-play" onClick={() => onPlay(album)}>
              ▶ Tocar
            </button>
          </div>
        </div>
      )}
      <div className="album-info">
        <h3 className="album-name">{album.title}</h3>
        <p className="album-artist">{album.artist || 'Artista desconhecido'}</p>
        <p className="album-year">{album.releaseYear || new Date().getFullYear()}</p>
        <span className="song-count">{album.songCount || 0} músicas</span>
      </div>
      <button className="btn-details" onClick={() => onViewDetails(album)}>
        Ver Detalhes
      </button>
    </div>
  );
}

export default AlbumCard;

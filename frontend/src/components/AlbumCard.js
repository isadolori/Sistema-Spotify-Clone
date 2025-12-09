import React from 'react';
import '../styles/AlbumCard.css';

function AlbumCard({ album }) {
  if (!album) return null;

  return (
    <div className="album-card">
      {album.coverUrl && (
        <div className="album-cover">
          <img src={album.coverUrl} alt={album.name} />
        </div>
      )}
      <div className="album-info">
        <h3 className="album-name">{album.title}</h3>
        <p className="album-artist">{album.artist || 'Artista desconhecido'}</p>
        <p className="album-year">{album.releaseYear || new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default AlbumCard;

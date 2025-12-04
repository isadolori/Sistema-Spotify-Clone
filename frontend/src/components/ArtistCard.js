/**
 * Componente ArtistCard - Card individual de artista
 */

import React from 'react';
import '../styles/ArtistCard.css';

function ArtistCard({ artist, onFollow, onViewDetails }) {
  if (!artist) return null;

  return (
    <div className="artist-card">
      {artist.imageUrl && (
        <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
      )}
      <div className="artist-info">
        <h3 className="artist-name">{artist.name}</h3>
        <p className="artist-followers">
          {artist.followers?.toLocaleString() || '0'} seguidores
        </p>
      </div>
      <div className="artist-actions">
        <button className="btn-follow" onClick={() => onFollow(artist)}>
          Seguir
        </button>
        <button className="btn-details" onClick={() => onViewDetails(artist)}>
          Detalhes
        </button>
      </div>
    </div>
  );
}

export default ArtistCard;

import React from 'react';
import '../styles/ArtistCard.css';

function ArtistCard({ artist }) {
  if (!artist) return null;

  return (
    <div className="artist-card">
      {artist.imageUrl && (
        <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
      )}
      <div className="artist-info">
        <h3 className="artist-name">{artist.name}</h3>
        {artist.verified && <span className="artist-verified">✓ Verificado</span>}
      </div>
    </div>
  );
}

export default ArtistCard;

import React, { useEffect, useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import ArtistCard from '../components/ArtistCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/pages/Home.css';

function Artists() {
  const { 
    artists, 
    isLoading, 
    error, 
    loadArtists,
    clearError 
  } = useMusicContext();

  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    loadArtists({ limit: 50, sort: sortBy });
  }, [sortBy]);

  if (isLoading && artists.length === 0) {
    return <Loading message="Carregando artistas..." />;
  }

  return (
    <div className="home">
      <div className="container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <section className="search-section">
          <h1 className="welcome-title">Todos os Artistas</h1>
          <p className="welcome-subtitle">Descubra artistas incríveis</p>
          
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 15px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              <option value="popular">Mais Populares</option>
              <option value="newest">Mais Recentes</option>
              <option value="name">Por Nome</option>
            </select>
          </div>
        </section>

        {artists.length > 0 && (
          <section className="featured-section">
            <div className="grid grid-5">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                />
              ))}
            </div>
          </section>
        )}

        {artists.length === 0 && !isLoading && (
          <section style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              Nenhum artista encontrado
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Artists;

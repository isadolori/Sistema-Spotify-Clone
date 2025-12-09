import React, { useEffect, useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import SongCard from '../components/SongCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/pages/Home.css';

function Songs() {
  const { 
    songs, 
    isLoading, 
    error, 
    loadSongs,
    clearError 
  } = useMusicContext();

  const [sortBy, setSortBy] = useState('trending');

  useEffect(() => {
    loadSongs({ limit: 50, sort: sortBy });
  }, [sortBy]);

  if (isLoading && songs.length === 0) {
    return <Loading message="Carregando músicas..." />;
  }

  return (
    <div className="home">
      <div className="container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <section className="search-section">
          <h1 className="welcome-title">Todas as Músicas</h1>
          <p className="welcome-subtitle">Explore toda a nossa biblioteca de músicas</p>
          
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
              <option value="trending">Tendências</option>
              <option value="newest">Mais Recentes</option>
              <option value="popular">Mais Populares</option>
            </select>
          </div>
        </section>

        {songs.length > 0 && (
          <section className="featured-section">
            <div className="grid grid-5">
              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                />
              ))}
            </div>
          </section>
        )}

        {songs.length === 0 && !isLoading && (
          <section style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              Nenhuma música encontrada
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Songs;

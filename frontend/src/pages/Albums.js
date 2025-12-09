import React, { useEffect, useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/pages/Home.css';

function Albums() {
  const { 
    albums, 
    isLoading, 
    error, 
    loadAlbums,
    clearError 
  } = useMusicContext();

  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    loadAlbums({ limit: 50, sort: sortBy });
  }, [sortBy]);

  if (isLoading && albums.length === 0) {
    return <Loading message="Carregando álbuns..." />;
  }

  return (
    <div className="home">
      <div className="container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <section className="search-section">
          <h1 className="welcome-title">Todos os Álbuns</h1>
          <p className="welcome-subtitle">Explore álbuns de grandes artistas</p>
          
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
              <option value="recent">Mais Recentes</option>
              <option value="popular">Mais Populares</option>
              <option value="oldest">Mais Antigos</option>
            </select>
          </div>
        </section>

        {albums.length > 0 && (
          <section className="featured-section">
            <div className="grid grid-5">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                />
              ))}
            </div>
          </section>
        )}

        {albums.length === 0 && !isLoading && (
          <section style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              Nenhum álbum encontrado
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Albums;

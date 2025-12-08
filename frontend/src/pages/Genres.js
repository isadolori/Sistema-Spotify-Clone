/**
 * Página Genres - Lista completa de gêneros
 */

import React, { useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/pages/Home.css';

function Genres() {
  const { 
    genres, 
    isLoading, 
    error, 
    loadGenres,
    clearError 
  } = useMusicContext();

  useEffect(() => {
    loadGenres();
  }, []);

  const handleSelectGenre = (genre) => {
    // Redirecionar para página de gênero (pode ser implementado depois)
    console.log('Gênero selecionado:', genre.name);
    // window.location.href = `/genre/${genre.id}`;
  };

  if (isLoading && genres.length === 0) {
    return <Loading message="Carregando gêneros..." />;
  }

  return (
    <div className="home">
      <div className="container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        {/* Seção de Cabeçalho */}
        <section className="search-section">
          <h1 className="welcome-title">Todos os Gêneros</h1>
          <p className="welcome-subtitle">Explore diferentes estilos musicais</p>
        </section>

        {/* Seção de Gêneros */}
        {genres.length > 0 && (
          <section className="featured-section">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
            }}>
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => handleSelectGenre(genre)}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'var(--transition-normal)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '200px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Imagem do Gênero */}
                  <div style={{
                    flex: 1,
                    backgroundColor: 'var(--bg-secondary)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {genre.imageUrl ? (
                      <img
                        src={genre.imageUrl}
                        alt={genre.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'var(--transition-normal)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    ) : (
                      <div style={{
                        fontSize: '48px',
                        color: 'var(--primary-color)',
                      }}>
                        🎵
                      </div>
                    )}
                  </div>

                  {/* Informações */}
                  <div style={{
                    padding: 'var(--spacing-md)',
                    minHeight: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      margin: '0 0 8px 0',
                    }}>
                      {genre.name}
                    </h3>
                    {genre.description && (
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {genre.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {genres.length === 0 && !isLoading && (
          <section style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              Nenhum gênero encontrado
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Genres;

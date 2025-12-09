import React, { useEffect, useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/pages/Home.css';

function Home() {
  const { 
    songs, 
    artists, 
    albums, 
    isLoading, 
    error, 
    loadSongs, 
    loadArtists, 
    loadAlbums,
    clearError 
  } = useMusicContext();

  const [topSongs, setTopSongs] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [recentAlbums, setRecentAlbums] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await Promise.all([
        loadSongs({ limit: 10, sort: 'trending' }),
        loadArtists({ limit: 10, featured: true }),
        loadAlbums({ limit: 10, sort: 'recent' }),
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados iniciais:', err);
    }
  };

  const handleSearch = (query) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  if (isLoading && songs.length === 0) {
    return <Loading message="Carregando conteúdo..." />;
  }

  return (
    <div className="home">
      <div className="container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        {/* busca destaque */}
        <section className="search-section">
          <h1 className="welcome-title">Bem-vindo à Música</h1>
          <p className="welcome-subtitle">Descubra suas músicas favoritas</p>
          <SearchBar onSearch={handleSearch} />
        </section>

        {/* músicas em destaque */}
        {songs.length > 0 && (
          <section className="featured-section">
            <div className="section-header">
              <h2>Tendências Agora</h2>
              <a href="/explore" className="view-all">Ver tudo →</a>
            </div>
            <div className="grid grid-5">
              {songs.slice(0, 5).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                />
              ))}
            </div>
          </section>
        )}

        {/* artistas em destaque */}
        {artists.length > 0 && (
          <section className="featured-section">
            <div className="section-header">
              <h2>Artistas em Destaque</h2>
              <a href="/artists" className="view-all">Ver tudo →</a>
            </div>
            <div className="grid grid-5">
              {artists.slice(0, 5).map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                />
              ))}
            </div>
          </section>
        )}

        {/* álbuns recentes */}
        {albums.length > 0 && (
          <section className="featured-section">
            <div className="section-header">
              <h2>Lançamentos Recentes</h2>
              <a href="/albums" className="view-all">Ver tudo →</a>
            </div>
            <div className="grid grid-5">
              {albums.slice(0, 5).map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                />
              ))}
            </div>
          </section>
        )}

        {/* recomendações personalizadas */}
        {songs.length > 5 && (
          <section className="featured-section">
            <div className="section-header">
              <h2>Recomendado Para Você</h2>
            </div>
            <div className="grid grid-5">
              {songs.slice(5, 10).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import '../styles/pages/Search.css';

function Search() {
  const { 
    songs, 
    artists, 
    albums, 
    isLoading, 
    error, 
    searchSongs,
    clearError 
  } = useMusicContext();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    songs: [],
    artists: [],
    albums: [],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, []);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    try {
      await searchSongs(searchQuery);
    } catch (err) {
      console.error('Erro ao buscar:', err);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    performSearch(newQuery);
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(newQuery)}`);
  };

  if (isLoading && !query) {
    return <Loading message="Carregando..." />;
  }

  return (
    <div className="search-page">
      <div className="container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <section className="search-hero">
          <h1>Buscar Músicas</h1>
          <p>Encontre suas músicas, artistas e álbuns favoritos</p>
          <SearchBar onSearch={handleSearch} />
        </section>

        {query && (
          <>
            <section className="search-results">
              <h2>Resultados para "{query}"</h2>

              {isLoading ? (
                <Loading message="Buscando..." />
              ) : (
                <>
                  {songs.length > 0 && (
                    <div className="results-section">
                      <h3>Músicas ({songs.length})</h3>
                      <div className="grid grid-4">
                        {songs.slice(0, 8).map((song) => (
                          <SongCard
                            key={song.id}
                            song={song}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {artists.length > 0 && (
                    <div className="results-section">
                      <h3>Artistas ({artists.length})</h3>
                      <div className="grid grid-4">
                        {artists.slice(0, 8).map((artist) => (
                          <ArtistCard
                            key={artist.id}
                            artist={artist}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {albums.length > 0 && (
                    <div className="results-section">
                      <h3>Álbuns ({albums.length})</h3>
                      <div className="grid grid-4">
                        {albums.slice(0, 8).map((album) => (
                          <AlbumCard
                            key={album.id}
                            album={album}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {songs.length === 0 && artists.length === 0 && albums.length === 0 && (
                    <div className="no-results">
                      <p>Nenhum resultado encontrado para "{query}"</p>
                      <p>Tente buscar com outros termos</p>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Search;

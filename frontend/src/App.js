import React, { useEffect } from 'react';
import { MusicProvider } from './context/MusicContext';
import { UserProvider, useUserContext } from './context/UserContext';
import Header from './components/Header';
import Player from './components/Player';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Songs from './pages/Songs';
import Artists from './pages/Artists';
import Albums from './pages/Albums';
import Genres from './pages/Genres';
import './styles/globals.css';
import './App.css';

function AppRouter() {
  const { isAuthenticated } = useUserContext();
  const [currentSong, setCurrentSong] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const getPath = () => {
    return window.location.pathname;
  };

  const renderPage = () => {
    const path = getPath();

    if (path === '/login') return <Login />;
    if (path === '/register') return <Register />;
    if (path === '/search' || path === '/search/') return <Search />;
    if (path === '/explore' || path === '/explore/') return <Songs />;
    if (path === '/artists' || path === '/artists/') return <Artists />;
    if (path === '/albums' || path === '/albums/') return <Albums />;
    if (path === '/genres' || path === '/genres/') return <Genres />;
    if (path === '/' || path === '') return <Home />;

    return <Home />;
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {renderPage()}
      </main>
      {currentSong && (
        <Player
          song={currentSong}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onNext={() => console.log('Próxima')}
          onPrevious={() => console.log('Anterior')}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <MusicProvider>
        <AppRouter />
      </MusicProvider>
    </UserProvider>
  );
}

export default App;

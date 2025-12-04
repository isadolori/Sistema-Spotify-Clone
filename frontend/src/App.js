import React, { useEffect } from 'react';
import { MusicProvider } from './context/MusicContext';
import { UserProvider, useUserContext } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';
import Header from './components/Header';
import Player from './components/Player';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import './styles/globals.css';
import './App.css';

/**
 * Router simples para navegação entre páginas
 * Você pode substituir por React Router depois se desejar
 */
function AppRouter() {
  const { isAuthenticated } = useUserContext();
  const [currentSong, setCurrentSong] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const getPath = () => {
    return window.location.pathname;
  };

  const renderPage = () => {
    const path = getPath();

    // Páginas públicas
    if (path === '/login') return <Login />;
    if (path === '/register') return <Register />;

    // Páginas que requerem autenticação
    if (path === '/search' || path === '/search/') return <Search />;
    if (path === '/' || path === '') return <Home />;

    // Página padrão
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

/**
 * Componente principal da aplicação
 * Envolve todos os Providers necessários
 */
function App() {
  return (
    <UserProvider>
      <MusicProvider>
        <PaymentProvider>
          <AppRouter />
        </PaymentProvider>
      </MusicProvider>
    </UserProvider>
  );
}

export default App;

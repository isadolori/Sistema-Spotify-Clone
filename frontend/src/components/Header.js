import React from 'react';
import { useUserContext } from '../context/UserContext';
import '../styles/Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useUserContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>SpotifyClone</h1>
        </div>

        <nav className="nav-menu">
          <a href="/" className="nav-link">Home</a>
          <a href="/explore" className="nav-link">Explorar</a>
          <a href="/search" className="nav-link">Buscar</a>
          {isAuthenticated && (
            <a href="/playlists" className="nav-link">Minhas Playlists</a>
          )}
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">{user?.name || 'Usuário'}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="/login" className="btn btn-login">Login</a>
              <a href="/register" className="btn btn-register">Registrar</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

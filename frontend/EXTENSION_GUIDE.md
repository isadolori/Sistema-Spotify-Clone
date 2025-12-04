# Guia de Extensão do Projeto

Este documento fornece um guia prático para estender e personalizar o SpotifyClone.

## 1. Adicionando Novas Páginas

### Passo 1: Criar o arquivo da página
Crie um novo arquivo em `src/pages/MinhaPagina.js`:

```javascript
import React from 'react';
import '../styles/pages/MinhaPagina.css';

function MinhaPagina() {
  return (
    <div className="minha-pagina">
      <h1>Minha Nova Página</h1>
    </div>
  );
}

export default MinhaPagina;
```

### Passo 2: Criar os estilos
Crie `src/styles/pages/MinhaPagina.css`

### Passo 3: Adicionar rota no App.js
No arquivo `src/App.js`, adicione a rota:

```javascript
if (path === '/minha-pagina') return <MinhaPagina />;
```

## 2. Adicionando Novos Componentes

### Exemplo: Criar um componente Modal

```javascript
// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css';

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
```

## 3. Estendendo os Serviços

### Exemplo: Adicionar métodos ao MusicService

```javascript
// Em src/services/music.service.js

async createPlaylist(playlistData) {
  const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}`;
  return apiService.post(url, playlistData);
}

async addSongToPlaylist(playlistId, songId) {
  const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}/${playlistId}/songs`;
  return apiService.post(url, { songId });
}

async removeSongFromPlaylist(playlistId, songId) {
  const url = `${BASE_URL}${ENDPOINTS.PLAYLISTS}/${playlistId}/songs/${songId}`;
  return apiService.delete(url);
}
```

## 4. Adicionar Novo Context

### Exemplo: Criar PlaylistContext

```javascript
// src/context/PlaylistContext.js
import React, { createContext, useContext, useState } from 'react';
import musicService from '../services/music.service';

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPlaylists = async () => {
    try {
      setIsLoading(true);
      const data = await musicService.listPlaylists();
      setPlaylists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    playlists,
    isLoading,
    error,
    loadPlaylists,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylistContext() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylistContext deve ser usado dentro de PlaylistProvider');
  }
  return context;
}
```

### Adicionar o provider ao App.js:

```javascript
<UserProvider>
  <MusicProvider>
    <PlaylistProvider>  {/* Novo */}
      <PaymentProvider>
        <AppRouter />
      </PaymentProvider>
    </PlaylistProvider>
  </MusicProvider>
</UserProvider>
```

## 5. Usando os Context em Componentes

```javascript
import React, { useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useUserContext } from '../context/UserContext';

function MeuComponente() {
  const { songs, loadSongs, isLoading } = useMusicContext();
  const { user, isAuthenticated } = useUserContext();

  useEffect(() => {
    if (isAuthenticated) {
      loadSongs();
    }
  }, [isAuthenticated]);

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Olá, {user?.name}</h1>
      <ul>
        {songs.map(song => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MeuComponente;
```

## 6. Adicionando Formulários

### Exemplo: Criar um formulário de feedback

```javascript
import React, { useState } from 'react';
import '../styles/FeedbackForm.css';

function FeedbackForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData({ email: '', message: '', rating: 5 });
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Seu email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Sua mensagem"
        required
      />
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="1">Muito ruim</option>
        <option value="2">Ruim</option>
        <option value="3">Ok</option>
        <option value="4">Bom</option>
        <option value="5">Excelente</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Enviar Feedback
      </button>
    </form>
  );
}

export default FeedbackForm;
```

## 7. Adicionando Temas (Dark/Light)

```javascript
// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

## 8. Adicionando Testes

### Exemplo: Testar um componente simples

```javascript
// src/components/Button.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('deve renderizar botão com texto', () => {
  render(<Button>Clique em mim</Button>);
  expect(screen.getByText('Clique em mim')).toBeInTheDocument();
});

test('deve chamar callback ao clicar', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Clique</Button>);
  await userEvent.click(screen.getByText('Clique'));
  expect(handleClick).toHaveBeenCalled();
});
```

## 9. Adicionando React Router (Recomendado)

### Instalar:
```bash
npm install react-router-dom
```

### Configurar rotas:
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 10. Estrutura Recomendada para um Microsserviço

Quando implementar um microsserviço, considere esta estrutura:

```
music-service/
├── src/
│   ├── controllers/
│   │   └── songs.controller.js
│   ├── services/
│   │   └── songs.service.js
│   ├── routes/
│   │   └── songs.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── song.model.js
│   ├── config/
│   │   └── database.js
│   └── app.js
├── tests/
├── .env
├── package.json
└── README.md
```

---

Para mais informações, consulte a documentação oficial de React em https://react.dev

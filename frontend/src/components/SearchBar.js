import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch, placeholder = 'Buscar músicas, artistas, álbuns...' }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {query && (
        <button
          type="button"
          className="btn-clear"
          onClick={handleClear}
          title="Limpar"
        >
          ✕
        </button>
      )}
      <button type="submit" className="btn-search" title="Buscar">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;

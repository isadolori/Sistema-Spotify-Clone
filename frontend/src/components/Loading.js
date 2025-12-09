import React from 'react';
import '../styles/Loading.css';

function Loading({ message = 'Carregando...' }) {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loading;

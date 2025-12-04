/**
 * Componente Player - Player de música
 */

import React, { useState } from 'react';
import '../styles/Player.css';

function Player({ song, isPlaying, onPlay, onPause, onNext, onPrevious }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);

  if (!song) {
    return (
      <div className="player player-empty">
        <p>Nenhuma música sendo reproduzida</p>
      </div>
    );
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  return (
    <div className="player">
      <div className="player-info">
        <div className="player-cover">
          {song.coverUrl && <img src={song.coverUrl} alt={song.title} />}
        </div>
        <div className="player-details">
          <h4>{song.title}</h4>
          <p>{song.artist?.name || 'Artista desconhecido'}</p>
        </div>
      </div>

      <div className="player-controls">
        <button className="btn-prev" onClick={onPrevious} title="Anterior">
          ⏮
        </button>
        <button 
          className="btn-play-pause" 
          onClick={handlePlayPause}
          title={isPlaying ? 'Pausar' : 'Tocar'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="btn-next" onClick={onNext} title="Próxima">
          ⏭
        </button>
      </div>

      <div className="player-progress">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
          className="progress-bar"
        />
        <span className="time">{song.duration || '3:45'}</span>
      </div>

      <div className="player-volume">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="volume-slider"
        />
        <span className="volume-percent">{volume}%</span>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default Player;

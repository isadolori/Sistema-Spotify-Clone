import React, { useEffect, useState } from 'react';
import '../styles/ErrorAlert.css';

function ErrorAlert({ message, onClose, autoClose = true, duration = 5000 }) {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message && autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, autoClose, duration, onClose]);

  if (!visible || !message) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div className="error-alert">
      <div className="error-content">
        <span className="error-icon">⚠</span>
        <p>{message}</p>
        <button className="btn-close" onClick={handleClose}>✕</button>
      </div>
    </div>
  );
}

export default ErrorAlert;

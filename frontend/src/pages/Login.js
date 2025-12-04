/**
 * Página Login - Autenticação de usuários
 */

import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import '../styles/pages/Auth.css';

function Login() {
  const { login, isLoading, error, clearError } = useUserContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      // Redirecionar para home
      window.location.href = '/';
    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <div className="auth-box">
          <div className="auth-header">
            <h1>Login</h1>
            <p>Acesse sua conta do SpotifyClone</p>
          </div>

          {isLoading ? (
            <Loading message="Autenticando..." />
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Entrar
              </button>

              <div className="auth-links">
                <a href="/forgot-password">Esqueceu a senha?</a>
              </div>
            </form>
          )}

          <div className="auth-footer">
            <p>Não tem uma conta? <a href="/register">Registre-se aqui</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

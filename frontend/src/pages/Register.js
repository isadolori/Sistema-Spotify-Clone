import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import '../styles/pages/Auth.css';

function Register() {
  const { register, isLoading, error, clearError } = useUserContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      window.location.href = '/';
    } catch (err) {
      console.error('Erro ao registrar:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {error && <ErrorAlert message={error} onClose={clearError} />}

        <div className="auth-box">
          <div className="auth-header">
            <h1>Registrar</h1>
            <p>Crie sua conta do SpotifyClone</p>
          </div>

          {isLoading ? (
            <Loading message="Registrando..." />
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu Nome"
                  required
                />
              </div>

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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                Registrar
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>Já tem uma conta? <a href="/login">Faça login aqui</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

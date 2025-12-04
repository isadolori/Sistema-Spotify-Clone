/**
 * Serviço de Usuário - Comunicação com o microsserviço de usuários/autenticação
 * Responsável por autenticação, perfil e gerenciamento de conta
 */

import apiService from './api.service';
import { MICROSERVICES } from '../config/api.config';

const BASE_URL = MICROSERVICES.USER_SERVICE.BASE_URL;
const ENDPOINTS = MICROSERVICES.USER_SERVICE.ENDPOINTS;

class UserService {
  /**
   * Registrar novo usuário
   */
  async register(userData) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/register`;
    return apiService.post(url, userData);
  }

  /**
   * Login do usuário
   */
  async login(email, password) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/login`;
    return apiService.post(url, { email, password });
  }

  /**
   * Logout do usuário
   */
  async logout() {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/logout`;
    return apiService.post(url);
  }

  /**
   * Renovar token de autenticação
   */
  async refreshToken() {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/refresh`;
    return apiService.post(url);
  }

  /**
   * Verificar se o token é válido
   */
  async validateToken(token) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/validate`;
    return apiService.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /**
   * Obter perfil do usuário autenticado
   */
  async getProfile() {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}`;
    return apiService.get(url);
  }

  /**
   * Atualizar perfil do usuário
   */
  async updateProfile(profileData) {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}`;
    return apiService.put(url, profileData);
  }

  /**
   * Alterar senha do usuário
   */
  async changePassword(currentPassword, newPassword) {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/change-password`;
    return apiService.put(url, { currentPassword, newPassword });
  }

  /**
   * Obter preferências do usuário
   */
  async getPreferences() {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/preferences`;
    return apiService.get(url);
  }

  /**
   * Atualizar preferências do usuário
   */
  async updatePreferences(preferences) {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/preferences`;
    return apiService.put(url, preferences);
  }

  /**
   * Obter histórico de reprodução
   */
  async getHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/history${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  /**
   * Limpar histórico de reprodução
   */
  async clearHistory() {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/history`;
    return apiService.delete(url);
  }

  /**
   * Recuperar senha (reset)
   */
  async requestPasswordReset(email) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/forgot-password`;
    return apiService.post(url, { email });
  }

  /**
   * Confirmar reset de senha
   */
  async confirmPasswordReset(token, newPassword) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/reset-password`;
    return apiService.post(url, { token, newPassword });
  }
}

export default new UserService();

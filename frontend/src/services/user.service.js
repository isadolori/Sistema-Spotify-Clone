import apiService from './api.service';
import { MICROSERVICES } from '../config/api.config';

const BASE_URL = MICROSERVICES.USER_SERVICE.BASE_URL;
const ENDPOINTS = MICROSERVICES.USER_SERVICE.ENDPOINTS;

class UserService {
  async register(userData) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/register`;
    return apiService.post(url, userData);
  }

  async login(email, password) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/login`;
    return apiService.post(url, { email, password });
  }

  async logout() {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/logout`;
    return apiService.post(url);
  }

  async refreshToken() {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/refresh`;
    return apiService.post(url);
  }

  async validateToken(token) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/validate`;
    return apiService.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async getProfile() {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}`;
    return apiService.get(url);
  }

  async updateProfile(profileData) {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}`;
    return apiService.put(url, profileData);
  }

  async changePassword(currentPassword, newPassword) {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/change-password`;
    return apiService.put(url, { currentPassword, newPassword });
  }

  async getPreferences() {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/preferences`;
    return apiService.get(url);
  }

  async updatePreferences(preferences) {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/preferences`;
    return apiService.put(url, preferences);
  }

  async getHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/history${queryString ? '?' + queryString : ''}`;
    return apiService.get(url);
  }

  async clearHistory() {
    const url = `${BASE_URL}${ENDPOINTS.PROFILE}/history`;
    return apiService.delete(url);
  }

  async requestPasswordReset(email) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/forgot-password`;
    return apiService.post(url, { email });
  }

  async confirmPasswordReset(token, newPassword) {
    const url = `${BASE_URL}${ENDPOINTS.AUTH}/reset-password`;
    return apiService.post(url, { token, newPassword });
  }
}

export default new UserService();

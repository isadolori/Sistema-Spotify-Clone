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
}

export default new UserService();

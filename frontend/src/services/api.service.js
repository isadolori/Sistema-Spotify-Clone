import { API_TIMEOUTS } from '../config/api.config';

class ApiService {
  constructor() {
    this.timeout = API_TIMEOUTS.MEDIUM;
  }

  /**
   * @param {string} url
   * @param {object} options
   * @param {number} retries
   * @returns {Promise<object>}
   */

  async request(url, options = {}, retries = 3) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          response.statusText,
          response.status,
          await response.json().catch(() => ({}))
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (retries > 0 && this.isRetryableError(error)) {
        await this.delay(1000);
        return this.request(url, options, retries - 1);
      }

      throw error;
    }
  }

  get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      ...options,
    });
  }

  post(url, data = {}, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(url, data = {}, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(url, options = {}) {
    return this.request(url, {
      method: 'DELETE',
      ...options,
    });
  }

  isRetryableError(error) {
    if (error.name === 'AbortError') return true;
    if (error instanceof ApiError && error.status >= 500) return true;
    if (error instanceof TypeError) return true; // Network error
    return false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setTimeout(ms) {
    this.timeout = ms;
  }
}
export class ApiError extends Error {
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export default new ApiService();

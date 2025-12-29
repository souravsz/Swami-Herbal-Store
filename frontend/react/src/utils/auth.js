const BASE_URL = 'http://localhost:8000/';

class AuthService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  // Get base URL for use in other components
  getBaseURL() {
    return this.baseURL;
  }

  // Get tokens from localStorage
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  // Set tokens in localStorage
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Remove tokens from localStorage
  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  // Login method
  async login(username, password) {
    try {
      const response = await fetch(`${this.baseURL}user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.setTokens(data.access, data.refresh);
        return { success: true, data };
      } else {
        const error = await response.json();
        return { success: false, error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return null;
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
      } else {
        this.logout();
        return null;
      }
    } catch (error) {
      this.logout();
      return null;
    }
  }

  // Logout method
  logout() {
    this.clearTokens();
    window.location.href = '/login';
  }

  // API call with automatic token refresh
  async apiCall(endpoint, options = {}) {
    let accessToken = this.getAccessToken();

    const makeRequest = async (token) => {
      return fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      });
    };

    try {
      let response = await makeRequest(accessToken);

      // If token expired, try to refresh
      if (response.status === 401) {
        const newToken = await this.refreshAccessToken();
        if (newToken) {
          response = await makeRequest(newToken);
        } else {
          throw new Error('Authentication failed');
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
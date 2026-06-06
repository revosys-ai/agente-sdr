import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { mockRefresh } from '../mocks/auth.mock';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const { tokens, isTokenExpired, updateTokens, logout } = useAuthStore.getState();

  if (!tokens) return config;

  if (isTokenExpired()) {
    const refreshed = mockRefresh(tokens.refreshToken);
    if (refreshed) {
      updateTokens(refreshed);
      config.headers.Authorization = `Bearer ${refreshed.accessToken}`;
    } else {
      logout();
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired'));
    }
  } else {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

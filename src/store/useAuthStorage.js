import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('accessToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),

  // Login Action
  setLogin: (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
    set({ user: userData, token: token, isAuthenticated: true });
  },

  // Logout Action
  logout: () => {
    localStorage.clear();
    set({ user: null, token: null, isAuthenticated: false });
    window.location.href = '/login';
  }
}));
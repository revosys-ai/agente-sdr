import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, AuthTokens, UserRole } from '../types';

interface AuthStore {
  user: User | null;
  tokens: AuthTokens | null;
  activeRole: UserRole;
  isAuthenticated: boolean;

  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  updateTokens: (tokens: AuthTokens) => void;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      activeRole: 'equipe',
      isAuthenticated: false,

      login(user, tokens) {
        set({ user, tokens, isAuthenticated: true, activeRole: user.role });
      },

      logout() {
        set({ user: null, tokens: null, isAuthenticated: false, activeRole: 'equipe' });
      },

      setRole(role) {
        set({ activeRole: role });
      },

      updateTokens(tokens) {
        set({ tokens });
      },

      isTokenExpired() {
        const { tokens } = get();
        if (!tokens) return true;
        return Date.now() >= tokens.expiresAt - 30_000;
      },
    }),
    {
      name: 'revosys-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
        activeRole: state.activeRole,
      }),
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      mode: 'light',
      toggleMode: () => set(s => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'theme-storage' }
  )
);

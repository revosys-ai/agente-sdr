import { create } from 'zustand';
import { MOCK_CLIENTS } from '../mocks/data.mock';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppStore {
  activeTenantId: string;
  toasts: Toast[];
  setTenant: (tenantId: string) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeTenantId: 'demo-sdr',
  toasts: [],

  setTenant(tenantId) {
    set({ activeTenantId: tenantId });
  },

  addToast(message, type = 'info') {
    const id = `toast_${Date.now()}`;
    set(s => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }));
    }, 3500);
  },

  removeToast(id) {
    set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }));
  },
}));

export const CLIENT_OPTIONS = MOCK_CLIENTS.map(c => ({
  value: c.tenantId,
  label: c.name,
}));

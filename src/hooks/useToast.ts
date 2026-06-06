import { useAppStore } from '../store/appStore';

export function useToast() {
  const addToast = useAppStore(s => s.addToast);

  return {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    info: (message: string) => addToast(message, 'info'),
  };
}

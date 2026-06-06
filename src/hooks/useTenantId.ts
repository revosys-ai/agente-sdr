import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';

export function useTenantId(): string {
  const activeTenantId = useAppStore(s => s.activeTenantId);
  const activeRole = useAuthStore(s => s.activeRole);
  const user = useAuthStore(s => s.user);

  if (activeRole === 'cliente') {
    return user?.tenantId ?? activeTenantId;
  }
  return activeTenantId;
}

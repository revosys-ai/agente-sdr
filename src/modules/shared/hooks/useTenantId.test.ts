import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useTenantId } from './useTenantId';

const mockAppState = vi.fn();
const mockAuthState = vi.fn();

vi.mock('../../../store/appStore', () => ({
  useAppStore: (sel: (s: object) => unknown) => sel(mockAppState()),
}));

vi.mock('../../../store/authStore', () => ({
  useAuthStore: (sel: (s: object) => unknown) => sel(mockAuthState()),
}));

describe('useTenantId', () => {
  beforeEach(() => {
    mockAppState.mockReturnValue({ activeTenantId: 'demo-sdr' });
  });

  it('retorna activeTenantId quando role é equipe', () => {
    mockAuthState.mockReturnValue({ activeRole: 'equipe', user: null });
    const { result } = renderHook(() => useTenantId());
    expect(result.current).toBe('demo-sdr');
  });

  it('retorna user.tenantId quando role é cliente e usuário tem tenantId', () => {
    mockAuthState.mockReturnValue({
      activeRole: 'cliente',
      user: { tenantId: 'sorriso-odonto' },
    });
    const { result } = renderHook(() => useTenantId());
    expect(result.current).toBe('sorriso-odonto');
  });

  it('retorna activeTenantId quando role é cliente mas user não tem tenantId', () => {
    mockAuthState.mockReturnValue({ activeRole: 'cliente', user: null });
    const { result } = renderHook(() => useTenantId());
    expect(result.current).toBe('demo-sdr');
  });

  it('retorna activeTenantId quando role é cliente e user.tenantId é undefined', () => {
    mockAuthState.mockReturnValue({
      activeRole: 'cliente',
      user: { tenantId: undefined },
    });
    const { result } = renderHook(() => useTenantId());
    expect(result.current).toBe('demo-sdr');
  });

  it('retorna o tenant ativo correto quando equipe troca de cliente', () => {
    mockAppState.mockReturnValue({ activeTenantId: 'logpro' });
    mockAuthState.mockReturnValue({ activeRole: 'equipe', user: null });
    const { result } = renderHook(() => useTenantId());
    expect(result.current).toBe('logpro');
  });
});

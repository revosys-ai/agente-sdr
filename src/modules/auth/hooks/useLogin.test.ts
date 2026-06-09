import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLogin } from './useLogin';

const mockLogin = vi.fn();
vi.mock('../../../store/authStore', () => ({ useAuthStore: () => ({ login: mockLogin }) }));

vi.mock('../../../mocks/auth.mock', () => ({
  mockLogin: vi.fn((email: string) => {
    if (email === 'equipe@revosys.com') {
      return {
        user: { id: 'u1', name: 'Equipe', email, role: 'equipe', tenantId: null },
        tokens: { accessToken: 'tok', refreshToken: 'rtok' },
      };
    }
    return null;
  }),
}));

describe('useLogin', () => {
  beforeEach(() => { vi.clearAllMocks(); vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('estado inicial: sem erro, sem loading', () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('login válido chama store.login e retorna true', async () => {
    const { result } = renderHook(() => useLogin());
    let success: boolean;

    await act(async () => {
      const p = result.current.submit('equipe@revosys.com', 'senha123');
      vi.advanceTimersByTime(700);
      success = await p;
    });

    expect(success!).toBe(true);
    expect(mockLogin).toHaveBeenCalled();
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('login inválido define error e retorna false', async () => {
    const { result } = renderHook(() => useLogin());
    let success: boolean;

    await act(async () => {
      const p = result.current.submit('errado@x.com', 'wrong');
      vi.advanceTimersByTime(700);
      success = await p;
    });

    expect(success!).toBe(false);
    expect(mockLogin).not.toHaveBeenCalled();
    expect(result.current.error).toBe('E-mail ou senha inválidos.');
  });

  it('loading é true durante o submit', async () => {
    const { result } = renderHook(() => useLogin());
    let promise: Promise<boolean>;

    act(() => {
      promise = result.current.submit('equipe@revosys.com', 'senha123');
    });
    expect(result.current.loading).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(700);
      await promise;
    });
    expect(result.current.loading).toBe(false);
  });
});

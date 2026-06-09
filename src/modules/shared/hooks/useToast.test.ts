import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useToast } from './useToast';

const mockAddToast = vi.fn();

vi.mock('../../../store/appStore', () => ({
  useAppStore: (selector: (s: { addToast: typeof mockAddToast }) => unknown) =>
    selector({ addToast: mockAddToast }),
}));

describe('useToast', () => {
  beforeEach(() => {
    mockAddToast.mockClear();
  });

  it('chama addToast com tipo "success"', () => {
    const { result } = renderHook(() => useToast());
    act(() => { result.current.success('Salvo!'); });
    expect(mockAddToast).toHaveBeenCalledWith('Salvo!', 'success');
  });

  it('chama addToast com tipo "error"', () => {
    const { result } = renderHook(() => useToast());
    act(() => { result.current.error('Erro ao salvar.'); });
    expect(mockAddToast).toHaveBeenCalledWith('Erro ao salvar.', 'error');
  });

  it('chama addToast com tipo "info"', () => {
    const { result } = renderHook(() => useToast());
    act(() => { result.current.info('Em breve.'); });
    expect(mockAddToast).toHaveBeenCalledWith('Em breve.', 'info');
  });

  it('retorna um objeto com os três métodos', () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.success).toBe('function');
    expect(typeof result.current.error).toBe('function');
    expect(typeof result.current.info).toBe('function');
  });
});

import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { useCountUp } from './useCountUp';

describe('useCountUp', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('começa em 0', () => {
    const { result } = renderHook(() => useCountUp(100));
    expect(result.current).toBe(0);
  });

  it('chega ao valor alvo ao fim da animação', async () => {
    vi.useFakeTimers();

    let rafCallback: ((ts: number) => void) | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      rafCallback = cb;
      return 1;
    });

    const { result } = renderHook(() => useCountUp(50, 100));

    // Simula frames até completar a duração
    await act(async () => {
      for (let t = 0; t <= 110; t += 16) {
        rafCallback?.(t);
      }
    });

    expect(result.current).toBe(50);
  });

  it('reseta para 0 e reconta quando o alvo muda', async () => {
    vi.useFakeTimers();

    let rafCallback: ((ts: number) => void) | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      rafCallback = cb;
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { result, rerender } = renderHook(
      ({ to }: { to: number }) => useCountUp(to, 100),
      { initialProps: { to: 80 } }
    );

    // Avança metade da animação
    await act(async () => {
      for (let t = 0; t <= 50; t += 16) rafCallback?.(t);
    });

    // Muda o alvo — deve zerar
    rerender({ to: 30 });

    await act(async () => {
      // Primeiro frame após o reset
      rafCallback?.(0);
    });

    expect(result.current).toBe(0);

    // Completa a nova animação
    await act(async () => {
      for (let t = 0; t <= 110; t += 16) rafCallback?.(t);
    });

    expect(result.current).toBe(30);
  });

  it('retorna 0 quando alvo é 0', () => {
    // Sem RAF mock — o hook inicia em 0 e Math.round(0 * eased) = 0 em qualquer frame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

    const { result } = renderHook(() => useCountUp(0, 100));
    expect(result.current).toBe(0);
  });
});

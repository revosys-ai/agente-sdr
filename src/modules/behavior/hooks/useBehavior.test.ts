import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useBehavior } from './useBehavior';
import { createWrapper } from '../../../tests/queryWrapper';

vi.mock('../../shared/hooks/useTenantId', () => ({ useTenantId: () => 'demo-sdr' }));

const mockSuccess = vi.fn();
const mockError = vi.fn();
vi.mock('../../shared/hooks/useToast', () => ({ useToast: () => ({ success: mockSuccess, error: mockError }) }));

const { mockConfig } = vi.hoisted(() => ({
  mockConfig: { personaNome: 'Ana', personaTom: 'consultivo', personaEstilo: 'formal' },
}));

vi.mock('../../../services/behavior.service', () => ({
  getBehavior: vi.fn().mockResolvedValue(mockConfig),
  saveBehavior: vi.fn().mockResolvedValue({ ...mockConfig, personaNome: 'Bia' }),
  previewResponse: vi.fn().mockResolvedValue('Olá! Sou a Bia.'),
}));

describe('useBehavior', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('começa em loading com preview null', () => {
    const { result } = renderHook(() => useBehavior(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.preview).toBeNull();
    expect(result.current.loadingPreview).toBe(false);
  });

  it('retorna config de comportamento', async () => {
    const { result } = renderHook(() => useBehavior(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.personaNome).toBe('Ana');
  });

  it('handlePreview define preview e controla loadingPreview', async () => {
    const { result } = renderHook(() => useBehavior(), { wrapper: createWrapper() });
    await act(async () => { await result.current.handlePreview(); });
    expect(result.current.preview).toBe('Olá! Sou a Bia.');
    expect(result.current.loadingPreview).toBe(false);
  });

  it('save chama saveBehavior e toast.success', async () => {
    const { saveBehavior } = await import('../../../services/behavior.service');
    const { result } = renderHook(() => useBehavior(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => { result.current.save({ personaNome: 'Bia' }); });
    await waitFor(() => expect(mockSuccess).toHaveBeenCalled());
    expect(saveBehavior).toHaveBeenCalledWith('demo-sdr', { personaNome: 'Bia' });
  });
});

import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLeads } from './useLeads';
import { createWrapper } from '../../../tests/queryWrapper';

vi.mock('../../shared/hooks/useTenantId', () => ({ useTenantId: () => 'demo-sdr' }));

const mockSuccess = vi.fn();
vi.mock('../../shared/hooks/useToast', () => ({ useToast: () => ({ success: mockSuccess, error: vi.fn() }) }));

const { mockLeads } = vi.hoisted(() => ({
  mockLeads: [
    { id: '1', name: 'Lead A', score: 70, status: 'qualified' },
    { id: '2', name: 'Lead B', score: 40, status: 'new' },
  ],
}));

vi.mock('../../../services/leads.service', () => ({
  getLeads: vi.fn().mockResolvedValue(mockLeads),
  exportLeadsCSV: vi.fn().mockResolvedValue(undefined),
}));

describe('useLeads', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('começa em loading', () => {
    const { result } = renderHook(() => useLeads(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('retorna lista de leads após carregamento', async () => {
    const { result } = renderHook(() => useLeads(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe('Lead A');
  });

  it('handleExport chama exportLeadsCSV e toast.success', async () => {
    const { exportLeadsCSV } = await import('../../../services/leads.service');
    const { result } = renderHook(() => useLeads(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await act(async () => { await result.current.handleExport(); });
    expect(exportLeadsCSV).toHaveBeenCalledWith('demo-sdr');
    expect(mockSuccess).toHaveBeenCalledWith('CSV exportado com sucesso!');
  });
});

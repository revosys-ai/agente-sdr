import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useClients } from './useClients';
import { createWrapper } from '../../../tests/queryWrapper';

const { mockClients, mockTotals } = vi.hoisted(() => ({
  mockClients: [
    { id: 'c1', name: 'Acme', tenantId: 'acme', status: 'active' },
    { id: 'c2', name: 'Beta Corp', tenantId: 'beta', status: 'active' },
  ],
  mockTotals: { active: 12, leads: 142, meetings: 18, avgQualification: 33 },
}));

vi.mock('../../../services/clients.service', () => ({
  getClients: vi.fn().mockResolvedValue(mockClients),
  getTotals: vi.fn().mockResolvedValue(mockTotals),
}));

describe('useClients', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('começa em loading', () => {
    const { result } = renderHook(() => useClients(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.clients).toBeUndefined();
  });

  it('retorna lista de clientes', async () => {
    const { result } = renderHook(() => useClients(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.clients).toHaveLength(2);
    expect(result.current.clients?.[0].name).toBe('Acme');
  });

  it('retorna totais agregados', async () => {
    const { result } = renderHook(() => useClients(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.totals).toBeDefined());
    expect(result.current.totals?.active).toBe(12);
    expect(result.current.totals?.leads).toBe(142);
  });
});

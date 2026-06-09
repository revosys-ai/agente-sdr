import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useOverview } from './useOverview';
import { createWrapper } from '../../../tests/queryWrapper';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));

vi.mock('../../shared/hooks/useTenantId', () => ({
  useTenantId: () => 'demo-sdr',
}));

const { mockOverviewData, mockBehaviorData } = vi.hoisted(() => ({
  mockOverviewData: {
    metrics: { leads: 142, leadsChange: 18, qualificationRate: 33, meetings: 18, meetingsChange: 6, avgScore: 62, avgScoreChange: -2 },
    funnel: { received: 142, qualifying: 104, qualified: 47, meeting: 18 },
  },
  mockBehaviorData: { personaNome: 'Ana', personaTom: 'consultivo' },
}));

vi.mock('../../../services/overview.service', () => ({
  getOverview: vi.fn().mockResolvedValue(mockOverviewData),
}));
vi.mock('../../../services/behavior.service', () => ({
  getBehavior: vi.fn().mockResolvedValue(mockBehaviorData),
}));

describe('useOverview', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('começa em estado de loading', () => {
    const { result } = renderHook(() => useOverview(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('retorna métricas e funil após carregamento', async () => {
    const { result } = renderHook(() => useOverview(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.metrics.leads).toBe(142);
    expect(result.current.data?.funnel.received).toBe(142);
  });

  it('retorna dados de comportamento', async () => {
    const { result } = renderHook(() => useOverview(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.behavior).toBeDefined());
    expect(result.current.behavior?.personaNome).toBe('Ana');
  });

  it('goToBehavior chama navigate("/behavior")', async () => {
    const { result } = renderHook(() => useOverview(), { wrapper: createWrapper() });
    result.current.goToBehavior();
    expect(mockNavigate).toHaveBeenCalledWith('/behavior');
  });

  it('expõe o tenantId ativo', async () => {
    const { result } = renderHook(() => useOverview(), { wrapper: createWrapper() });
    expect(result.current.tenantId).toBe('demo-sdr');
  });
});

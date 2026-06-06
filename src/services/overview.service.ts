import { MOCK_OVERVIEW, delay } from '../mocks/data.mock';
import type { OverviewMetrics, FunnelData } from '../types';

export async function getOverview(tenantId: string): Promise<{ metrics: OverviewMetrics; funnel: FunnelData }> {
  await delay(300);
  return MOCK_OVERVIEW[tenantId] ?? MOCK_OVERVIEW['demo-sdr'];
}

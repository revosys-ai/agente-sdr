import { MOCK_CLIENTS, delay } from '../mocks/data.mock';
import type { Client } from '../types';

const localClients: Client[] = [...MOCK_CLIENTS];

export async function getClients(): Promise<Client[]> {
  await delay(350);
  return localClients;
}

export async function getTotals() {
  await delay(200);
  return {
    active: localClients.length,
    leads: localClients.reduce((s, c) => s + c.metrics.leads, 0),
    meetings: localClients.reduce((s, c) => s + c.metrics.meetings, 0),
    avgQualification: Math.round(
      localClients.reduce((s, c) => s + c.metrics.qualification, 0) / localClients.length
    ),
  };
}

import { MOCK_LEADS, delay } from '../mocks/data.mock';
import type { Lead } from '../types';

export async function getLeads(tenantId: string): Promise<Lead[]> {
  await delay(350);
  return MOCK_LEADS.filter(l => l.tenantId === tenantId);
}

export async function exportLeadsCSV(tenantId: string): Promise<void> {
  await delay(200);
  const leads = MOCK_LEADS.filter(l => l.tenantId === tenantId);
  const headers = 'Nome,Empresa,Cargo,Score,Status,Atualizado';
  const rows = leads.map(l =>
    `${l.name},${l.company},${l.role},${l.score},${l.status},${l.updatedAt}`
  );
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${tenantId}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

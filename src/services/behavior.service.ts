import { MOCK_BEHAVIOR, delay } from '../mocks/data.mock';
import type { BehaviorConfig } from '../types';

const localState: Record<string, BehaviorConfig> = { ...MOCK_BEHAVIOR };

export async function getBehavior(tenantId: string): Promise<BehaviorConfig> {
  await delay(300);
  return localState[tenantId] ?? localState['demo-sdr'];
}

export async function saveBehavior(tenantId: string, data: Partial<BehaviorConfig>): Promise<BehaviorConfig> {
  await delay(600);
  const current = localState[tenantId] ?? localState['demo-sdr'];
  localState[tenantId] = {
    ...current,
    ...data,
    lastEdit: 'agora mesmo',
    version: current.version + 1,
  };
  return localState[tenantId];
}

export async function previewResponse(tenantId: string): Promise<string> {
  await delay(800);
  const cfg = localState[tenantId] ?? localState['demo-sdr'];
  return `"Oi! Aqui é a ${cfg.personaNome} 🙂 Antes de falar de solução, me conta: qual processo da sua empresa hoje mais consome tempo da equipe?"`;
}

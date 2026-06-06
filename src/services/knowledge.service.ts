import { MOCK_KNOWLEDGE, delay } from '../mocks/data.mock';
import type { KnowledgeDoc } from '../types';

const localDocs: Record<string, KnowledgeDoc[]> = JSON.parse(JSON.stringify(MOCK_KNOWLEDGE));

export async function getKnowledge(tenantId: string): Promise<KnowledgeDoc[]> {
  await delay(300);
  return localDocs[tenantId] ?? [];
}

export async function uploadDocument(tenantId: string, file: File): Promise<KnowledgeDoc> {
  await delay(1200);
  const ext = file.name.split('.').pop()?.toUpperCase() as KnowledgeDoc['type'] ?? 'PDF';
  const doc: KnowledgeDoc = {
    id: `k_${Date.now()}`,
    name: file.name,
    type: ext,
    chunks: null,
    status: 'ingestao',
    updatedAt: 'agora',
    tenantId,
  };
  if (!localDocs[tenantId]) localDocs[tenantId] = [];
  localDocs[tenantId].unshift(doc);

  // Simulate indexing completing after a bit
  setTimeout(() => {
    const found = localDocs[tenantId].find(d => d.id === doc.id);
    if (found) {
      found.status = 'indexado';
      found.chunks = Math.floor(Math.random() * 40) + 5;
      found.updatedAt = 'há poucos instantes';
    }
  }, 3000);

  return doc;
}

import type { LeadStatus } from '../../types';

const STATUS_MAP: Record<LeadStatus, { cls: string; label: string }> = {
  novo: { cls: 'p-novo', label: 'novo' },
  qualificando: { cls: 'p-qual', label: 'qualificando' },
  qualificado: { cls: 'p-ok', label: 'qualificado' },
  reuniao_agendada: { cls: 'p-meet', label: 'reunião agendada' },
  desqualificado: { cls: 'p-desq', label: 'desqualificado' },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const { cls, label } = STATUS_MAP[status];
  return <span className={`pill ${cls}`}>{label}</span>;
}

type ClientStatus = 'saudavel' | 'ok' | 'atencao' | 'ajustar';

const CLIENT_STATUS_MAP: Record<ClientStatus, { cls: string; label: string }> = {
  saudavel: { cls: 'p-meet', label: 'saudável' },
  ok: { cls: 'p-ok', label: 'ok' },
  atencao: { cls: 'p-qual', label: 'atenção' },
  ajustar: { cls: 'p-desq', label: 'ajustar' },
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const { cls, label } = CLIENT_STATUS_MAP[status];
  return <span className={`pill ${cls}`}>{label}</span>;
}

type DocStatus = 'indexado' | 'ingestao' | 'erro';

const DOC_STATUS_MAP: Record<DocStatus, { cls: string; label: string }> = {
  indexado: { cls: 'p-ok', label: 'indexado' },
  ingestao: { cls: 'p-meet', label: 'ingestão' },
  erro: { cls: 'p-desq', label: 'erro' },
};

export function DocStatusBadge({ status }: { status: DocStatus }) {
  const { cls, label } = DOC_STATUS_MAP[status];
  return <span className={`pill ${cls}`}>{label}</span>;
}

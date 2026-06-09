import styled, { css } from 'styled-components';
import type { LeadStatus } from '../../types';

type Variant = 'novo' | 'qual' | 'ok' | 'meet' | 'desq';

const variantStyles: Record<Variant, ReturnType<typeof css>> = {
  novo: css`background: ${({ theme }) => theme.colors.surface3}; color: ${({ theme }) => theme.colors.text2};`,
  qual: css`background: rgba(111,210,255,.13); color: ${({ theme }) => theme.colors.cyan};`,
  ok:   css`background: rgba(58,160,255,.16);  color: ${({ theme }) => theme.colors.blue};`,
  meet: css`background: rgba(255,154,60,.16);  color: ${({ theme }) => theme.colors.gold};`,
  desq: css`background: rgba(255,122,107,.13); color: ${({ theme }) => theme.colors.red};`,
};

const Pill = styled.span<{ $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 20px;
  ${({ $variant }) => variantStyles[$variant]}
`;

const LEAD_MAP: Record<LeadStatus, { variant: Variant; label: string }> = {
  novo:             { variant: 'novo', label: 'novo' },
  qualificando:     { variant: 'qual', label: 'qualificando' },
  qualificado:      { variant: 'ok',   label: 'qualificado' },
  reuniao_agendada: { variant: 'meet', label: 'reunião agendada' },
  desqualificado:   { variant: 'desq', label: 'desqualificado' },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const { variant, label } = LEAD_MAP[status];
  return <Pill $variant={variant}>{label}</Pill>;
}

type ClientStatus = 'saudavel' | 'ok' | 'atencao' | 'ajustar';

const CLIENT_MAP: Record<ClientStatus, { variant: Variant; label: string }> = {
  saudavel: { variant: 'meet', label: 'saudável' },
  ok:       { variant: 'ok',   label: 'ok' },
  atencao:  { variant: 'qual', label: 'atenção' },
  ajustar:  { variant: 'desq', label: 'ajustar' },
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const { variant, label } = CLIENT_MAP[status];
  return <Pill $variant={variant}>{label}</Pill>;
}

type DocStatus = 'indexado' | 'ingestao' | 'erro';

const DOC_MAP: Record<DocStatus, { variant: Variant; label: string }> = {
  indexado: { variant: 'ok',   label: 'indexado' },
  ingestao: { variant: 'meet', label: 'ingestão' },
  erro:     { variant: 'desq', label: 'erro' },
};

export function DocStatusBadge({ status }: { status: DocStatus }) {
  const { variant, label } = DOC_MAP[status];
  return <Pill $variant={variant}>{label}</Pill>;
}

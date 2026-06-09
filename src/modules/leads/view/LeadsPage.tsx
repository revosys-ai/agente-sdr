import { useLeads } from '../hooks/useLeads';
import { StatusBadge } from '../../../utils/ui/Badge';
import { PageHeader } from '../../../utils/ui/PageHeader';
import { LoadingState } from '../../../utils/ui/Spinner';
import { Card, Btn, StyledTable, Th, Td, TBody } from '../../../styles/shared';
import { BantCell, ScoreValue, EmptyRow } from './LeadsPage.styles';
import type { BantScore } from '../../../types';

function BantDisplay({ bant }: { bant: BantScore }) {
  const f = (v: boolean | null, label: string) =>
    v === null ? '–' : v === false ? '✗' : label;
  return (
    <BantCell>
      {f(bant.budget, 'B')}·{f(bant.authority, 'A')}·{f(bant.need, 'N')}·{f(bant.timeline, 'T')}
    </BantCell>
  );
}

export function LeadsPage() {
  const { data: leads, isLoading, handleExport } = useLeads();

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        eyebrow="Pipeline"
        title="Leads"
        action={<Btn onClick={handleExport}>Exportar CSV</Btn>}
      />

      <Card $noPad>
        <StyledTable>
          <thead>
            <tr>
              <Th>Nome</Th><Th>Empresa</Th><Th>Cargo</Th>
              <Th>BANT</Th><Th>Score</Th><Th>Status</Th><Th>Atualizado</Th>
            </tr>
          </thead>
          <TBody>
            {leads?.map(lead => (
              <tr key={lead.id}>
                <Td>{lead.name}</Td>
                <Td>{lead.company}</Td>
                <Td>{lead.role}</Td>
                <Td><BantDisplay bant={lead.bant} /></Td>
                <Td><ScoreValue>{lead.score}</ScoreValue></Td>
                <Td><StatusBadge status={lead.status} /></Td>
                <Td><span style={{ color: '#525a70', fontSize: 12 }}>{lead.updatedAt}</span></Td>
              </tr>
            ))}
            {!leads?.length && (
              <tr><EmptyRow colSpan={7}>Nenhum lead encontrado</EmptyRow></tr>
            )}
          </TBody>
        </StyledTable>
      </Card>
    </div>
  );
}

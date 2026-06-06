import { useQuery } from '@tanstack/react-query';
import { getClients, getTotals } from '../services/clients.service';
import { ClientStatusBadge } from '../utils/ui/Badge';
import { MetricCard } from '../utils/ui/MetricCard';
import { PageHeader } from '../utils/ui/PageHeader';
import { LoadingState } from '../utils/ui/Spinner';
import { Card, Btn, StyledTable, Th, Td, TBody, GridCols4, HealthBar, HealthFill } from '../styles/shared';
import { ClientName, TenantCode } from './ClientsPage.styles';
import { useToast } from '../hooks/useToast';

export function ClientsPage() {
  const toast = useToast();

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const { data: totals } = useQuery({
    queryKey: ['clients-totals'],
    queryFn: getTotals,
  });

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        eyebrow="Multi-tenant"
        title="Carteira de clientes"
        action={
          <Btn onClick={() => toast.info('Em breve: cadastro de novo cliente')}>
            + Novo cliente
          </Btn>
        }
      />

      <GridCols4>
        <MetricCard label="Clientes ativos"  value={totals?.active ?? 0}           featured delay={0} />
        <MetricCard label="Leads (total)"    value={totals?.leads ?? 0}            delay={0.06} />
        <MetricCard label="Reuniões (total)" value={totals?.meetings ?? 0}         delay={0.12} />
        <MetricCard label="Qualif. média"    value={totals?.avgQualification ?? 0} suffix="%" delay={0.18} />
      </GridCols4>

      <Card $noPad>
        <StyledTable>
          <thead>
            <tr>
              <Th>Cliente</Th><Th>tenant_id</Th><Th>Leads</Th>
              <Th>Qualif.</Th><Th>Reuniões</Th><Th>Saúde</Th><Th>Status</Th>
            </tr>
          </thead>
          <TBody>
            {clients?.map(c => (
              <tr key={c.id}>
                <Td><ClientName>{c.name}</ClientName></Td>
                <Td><TenantCode>{c.tenantId}</TenantCode></Td>
                <Td>{c.metrics.leads}</Td>
                <Td>{c.metrics.qualification}%</Td>
                <Td>{c.metrics.meetings}</Td>
                <Td>
                  <HealthBar>
                    <HealthFill $pct={c.metrics.health} />
                  </HealthBar>
                </Td>
                <Td><ClientStatusBadge status={c.metrics.status} /></Td>
              </tr>
            ))}
          </TBody>
        </StyledTable>
      </Card>
    </div>
  );
}

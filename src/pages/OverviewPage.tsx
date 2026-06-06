import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { getOverview } from '../services/overview.service';
import { getBehavior } from '../services/behavior.service';
import { useTenantId } from '../hooks/useTenantId';
import { PageHeader } from '../utils/ui/PageHeader';
import { MetricCard } from '../utils/ui/MetricCard';
import { LoadingState } from '../utils/ui/Spinner';
import { CardTitle, CardSub, Btn, GridCols4, GridCols2, RiseCard } from '../styles/shared';
import {
  FunnelRow, FunnelName, Bar1, Bar2, Bar3, Bar4,
  BehaviorInfo, InfoLabel, InfoText,
} from './OverviewPage.styles';

export function OverviewPage() {
  const tenantId = useTenantId();
  const navigate = useNavigate();
  const { addToast: _t } = useAppStore(); // keeps import clean

  const { data, isLoading } = useQuery({
    queryKey: ['overview', tenantId],
    queryFn: () => getOverview(tenantId),
  });

  const { data: behavior } = useQuery({
    queryKey: ['behavior', tenantId],
    queryFn: () => getBehavior(tenantId),
  });

  if (isLoading) return <LoadingState />;
  if (!data) return null;

  const { metrics, funnel } = data;
  const pct = (n: number) => Math.round((n / funnel.received) * 100);

  return (
    <div>
      <PageHeader
        eyebrow="Performance · últimos 30 dias"
        title="Visão geral"
        action={<Btn>Últimos 30 dias ▾</Btn>}
      />

      <GridCols4>
        <MetricCard
          label="Leads no período"
          value={metrics.leads}
          delta={`▲ ${metrics.leadsChange}% vs. anterior`}
          featured
          delay={0.02}
        />
        <MetricCard
          label="Taxa de qualificação"
          value={metrics.qualificationRate}
          suffix="%"
          spark
          delay={0.08}
        />
        <MetricCard
          label="Reuniões agendadas"
          value={metrics.meetings}
          delta={`▲ ${metrics.meetingsChange} vs. anterior`}
          delay={0.14}
        />
        <MetricCard
          label="Score médio"
          value={metrics.avgScore}
          delta={`${metrics.avgScoreChange >= 0 ? '▲' : '▼'} ${Math.abs(metrics.avgScoreChange)} pts`}
          deltaDown={metrics.avgScoreChange < 0}
          delay={0.2}
        />
      </GridCols4>

      <GridCols2>
        <RiseCard $delay={0.26}>
          <CardTitle>Funil de qualificação <CardSub>LEADS · status</CardSub></CardTitle>
          <FunnelRow><FunnelName>Leads recebidos</FunnelName><Bar1 $w={100}>{funnel.received}</Bar1></FunnelRow>
          <FunnelRow><FunnelName>Em qualificação</FunnelName><Bar2 $w={pct(funnel.qualifying)}>{funnel.qualifying} · {pct(funnel.qualifying)}%</Bar2></FunnelRow>
          <FunnelRow><FunnelName>Qualificados</FunnelName><Bar3 $w={pct(funnel.qualified)}>{funnel.qualified} · {pct(funnel.qualified)}%</Bar3></FunnelRow>
          <FunnelRow><FunnelName>Reunião agendada</FunnelName><Bar4 $w={pct(funnel.meeting)}>{funnel.meeting} · {pct(funnel.meeting)}%</Bar4></FunnelRow>
        </RiseCard>

        <RiseCard $delay={0.32}>
          <CardTitle>Comportamento da IA <CardSub>SDR_CLIENTES</CardSub></CardTitle>
          <BehaviorInfo>
            <div>
              <InfoLabel>Persona &amp; tom</InfoLabel>
              <InfoText>{behavior?.personaNome} · {behavior?.personaTom}</InfoText>
            </div>
            <div>
              <InfoLabel>Produto &amp; ICP</InfoLabel>
              <InfoText $muted>{behavior?.produtoDescricao?.slice(0, 60)}…</InfoText>
            </div>
            <div>
              <InfoLabel>Roteiro</InfoLabel>
              <InfoText>{behavior?.perguntas?.split('\n').length ?? 0} perguntas · critérios definidos</InfoText>
            </div>
            <Btn style={{ width: '100%' }} onClick={() => navigate('/behavior')}>
              Editar comportamento →
            </Btn>
          </BehaviorInfo>
        </RiseCard>
      </GridCols2>
    </div>
  );
}

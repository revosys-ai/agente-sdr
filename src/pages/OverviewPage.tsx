import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { getOverview } from '../services/overview.service';
import { CountUp } from '../components/ui/CountUp';
import { LoadingState } from '../components/ui/Spinner';
import { getBehavior } from '../services/behavior.service';
import { useNavigate } from 'react-router-dom';

const SPARK_HEIGHTS = [40, 55, 48, 70, 62, 85];

export function OverviewPage() {
  const { activeTenantId } = useAppStore();
  const { activeRole, user } = useAuthStore();
  const navigate = useNavigate();

  const tenantId = activeRole === 'cliente'
    ? (user?.tenantId ?? activeTenantId)
    : activeTenantId;

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
  const funnelPct = {
    qualifying: Math.round((funnel.qualifying / funnel.received) * 100),
    qualified: Math.round((funnel.qualified / funnel.received) * 100),
    meeting: Math.round((funnel.meeting / funnel.received) * 100),
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">Performance · últimos 30 dias</div>
          <h1>Visão geral</h1>
        </div>
        <button className="btn">Últimos 30 dias ▾</button>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 16 }}>
        <div className="card metric feat rise" style={{ animationDelay: '.02s' }}>
          <div className="eyebrow">Leads no período</div>
          <div className="val"><CountUp to={metrics.leads} /></div>
          <div className="delta">▲ {metrics.leadsChange}% vs. anterior</div>
        </div>

        <div className="card metric rise" style={{ animationDelay: '.08s' }}>
          <div className="eyebrow">Taxa de qualificação</div>
          <div className="val"><CountUp to={metrics.qualificationRate} suffix="%" /></div>
          <div className="spark">
            {SPARK_HEIGHTS.map((h, i) => (
              <div key={i} className="spark-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="card metric rise" style={{ animationDelay: '.14s' }}>
          <div className="eyebrow">Reuniões agendadas</div>
          <div className="val"><CountUp to={metrics.meetings} /></div>
          <div className="delta">▲ {metrics.meetingsChange} vs. anterior</div>
        </div>

        <div className="card metric rise" style={{ animationDelay: '.2s' }}>
          <div className="eyebrow">Score médio</div>
          <div className="val"><CountUp to={metrics.avgScore} /></div>
          <div className={`delta ${metrics.avgScoreChange < 0 ? 'down' : ''}`}>
            {metrics.avgScoreChange >= 0 ? '▲' : '▼'} {Math.abs(metrics.avgScoreChange)} pts
          </div>
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card rise" style={{ animationDelay: '.26s' }}>
          <h3>Funil de qualificação <span className="sub">LEADS · status</span></h3>
          <div className="funnel-row">
            <span className="name">Leads recebidos</span>
            <div className="bar b1" style={{ width: '100%' }}>{funnel.received}</div>
          </div>
          <div className="funnel-row">
            <span className="name">Em qualificação</span>
            <div className="bar b2" style={{ width: `${funnelPct.qualifying}%` }}>
              {funnel.qualifying} · {funnelPct.qualifying}%
            </div>
          </div>
          <div className="funnel-row">
            <span className="name">Qualificados</span>
            <div className="bar b3" style={{ width: `${funnelPct.qualified}%` }}>
              {funnel.qualified} · {funnelPct.qualified}%
            </div>
          </div>
          <div className="funnel-row">
            <span className="name">Reunião agendada</span>
            <div className="bar b4" style={{ width: `${Math.max(funnelPct.meeting, 12)}%` }}>
              {funnel.meeting} · {funnelPct.meeting}%
            </div>
          </div>
        </div>

        <div className="card rise" style={{ animationDelay: '.32s' }}>
          <h3>Comportamento da IA <span className="sub">SDR_CLIENTES</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Persona &amp; tom</div>
              <div>{behavior?.personaNome} · {behavior?.personaTom}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Produto &amp; ICP</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{behavior?.produtoDescricao?.slice(0, 60)}…</div>
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>Roteiro</div>
              <div>
                {behavior?.perguntas?.split('\n').length ?? 0} perguntas · critérios de corte definidos
              </div>
            </div>
            <button className="btn" style={{ width: '100%' }} onClick={() => navigate('/behavior')}>
              Editar comportamento →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { getClients, getTotals } from '../services/clients.service';
import { ClientStatusBadge } from '../components/ui/Badge';
import { CountUp } from '../components/ui/CountUp';
import { LoadingState } from '../components/ui/Spinner';
import { useAppStore } from '../store/appStore';

export function ClientsPage() {
  const { addToast } = useAppStore();

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
      <div className="page-head">
        <div>
          <div className="eyebrow">Multi-tenant</div>
          <h1>Carteira de clientes</h1>
        </div>
        <button className="btn" onClick={() => addToast('Em breve: cadastro de novo cliente', 'info')}>
          + Novo cliente
        </button>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 16 }}>
        <div className="card metric feat rise">
          <div className="eyebrow">Clientes ativos</div>
          <div className="val">
            <CountUp to={totals?.active ?? 0} />
          </div>
        </div>
        <div className="card metric rise" style={{ animationDelay: '.06s' }}>
          <div className="eyebrow">Leads (total)</div>
          <div className="val"><CountUp to={totals?.leads ?? 0} /></div>
        </div>
        <div className="card metric rise" style={{ animationDelay: '.12s' }}>
          <div className="eyebrow">Reuniões (total)</div>
          <div className="val"><CountUp to={totals?.meetings ?? 0} /></div>
        </div>
        <div className="card metric rise" style={{ animationDelay: '.18s' }}>
          <div className="eyebrow">Qualif. média</div>
          <div className="val"><CountUp to={totals?.avgQualification ?? 0} suffix="%" /></div>
        </div>
      </div>

      <div className="card" style={{ padding: '10px 14px 6px' }}>
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>tenant_id</th>
              <th>Leads</th>
              <th>Qualif.</th>
              <th>Reuniões</th>
              <th>Saúde</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map(client => (
              <tr key={client.id}>
                <td><b>{client.name}</b></td>
                <td className="mono muted">{client.tenantId}</td>
                <td>{client.metrics.leads}</td>
                <td>{client.metrics.qualification}%</td>
                <td>{client.metrics.meetings}</td>
                <td>
                  <div className="health">
                    <span className="health-fill" style={{ width: `${client.metrics.health}%` }} />
                  </div>
                </td>
                <td><ClientStatusBadge status={client.metrics.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

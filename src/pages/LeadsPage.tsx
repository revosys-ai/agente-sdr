import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { getLeads, exportLeadsCSV } from '../services/leads.service';
import { StatusBadge } from '../components/ui/Badge';
import { LoadingState } from '../components/ui/Spinner';
import { useAppStore as useApp } from '../store/appStore';
import type { BantScore } from '../types';

function BantDisplay({ bant }: { bant: BantScore }) {
  const fmt = (v: boolean | null, label: string) => {
    if (v === null) return `–`;
    if (v === false) return `✗`;
    return label;
  };
  return (
    <span className="mono muted">
      {fmt(bant.budget, 'B')}·{fmt(bant.authority, 'A')}·{fmt(bant.need, 'N')}·{fmt(bant.timeline, 'T')}
    </span>
  );
}

export function LeadsPage() {
  const { activeTenantId } = useAppStore();
  const { activeRole, user } = useAuthStore();
  const { addToast } = useApp();

  const tenantId = activeRole === 'cliente'
    ? (user?.tenantId ?? activeTenantId)
    : activeTenantId;

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads', tenantId],
    queryFn: () => getLeads(tenantId),
  });

  const handleExport = async () => {
    await exportLeadsCSV(tenantId);
    addToast('CSV exportado com sucesso!', 'success');
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">Pipeline</div>
          <h1>Leads</h1>
        </div>
        <button className="btn" onClick={handleExport}>Exportar CSV</button>
      </div>

      <div className="card" style={{ padding: '10px 14px 6px' }}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Empresa</th>
              <th>Cargo</th>
              <th>BANT</th>
              <th>Score</th>
              <th>Status</th>
              <th>Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map(lead => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.company}</td>
                <td style={{ color: 'var(--text-2)' }}>{lead.role}</td>
                <td><BantDisplay bant={lead.bant} /></td>
                <td><b style={{ fontFamily: 'Sora' }}>{lead.score}</b></td>
                <td><StatusBadge status={lead.status} /></td>
                <td className="muted">{lead.updatedAt}</td>
              </tr>
            ))}
            {(!leads || leads.length === 0) && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-3)' }}>
                  Nenhum lead encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

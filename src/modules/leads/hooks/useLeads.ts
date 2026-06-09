import { useQuery } from '@tanstack/react-query';
import { getLeads, exportLeadsCSV } from '../../../services/leads.service';
import { useTenantId } from '../../shared/hooks/useTenantId';
import { useToast } from '../../shared/hooks/useToast';

export function useLeads() {
  const tenantId = useTenantId();
  const toast = useToast();

  const query = useQuery({
    queryKey: ['leads', tenantId],
    queryFn: () => getLeads(tenantId),
  });

  const handleExport = async () => {
    await exportLeadsCSV(tenantId);
    toast.success('CSV exportado com sucesso!');
  };

  return { ...query, handleExport };
}

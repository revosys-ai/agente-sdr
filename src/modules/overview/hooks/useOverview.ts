import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getOverview } from '../../../services/overview.service';
import { getBehavior } from '../../../services/behavior.service';
import { useTenantId } from '../../shared/hooks/useTenantId';

export function useOverview() {
  const tenantId = useTenantId();
  const navigate = useNavigate();

  const overviewQuery = useQuery({
    queryKey: ['overview', tenantId],
    queryFn: () => getOverview(tenantId),
  });

  const behaviorQuery = useQuery({
    queryKey: ['behavior', tenantId],
    queryFn: () => getBehavior(tenantId),
  });

  return {
    data: overviewQuery.data,
    isLoading: overviewQuery.isLoading,
    behavior: behaviorQuery.data,
    tenantId,
    goToBehavior: () => navigate('/behavior'),
  };
}

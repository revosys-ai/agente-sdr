import { useQuery } from '@tanstack/react-query';
import { getClients, getTotals } from '../../../services/clients.service';

export function useClients() {
  const clientsQuery = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const totalsQuery = useQuery({
    queryKey: ['clients-totals'],
    queryFn: getTotals,
  });

  return {
    clients: clientsQuery.data,
    isLoading: clientsQuery.isLoading,
    totals: totalsQuery.data,
  };
}

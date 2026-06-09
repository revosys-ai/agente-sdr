import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBehavior, saveBehavior, previewResponse } from '../../../services/behavior.service';
import { useTenantId } from '../../shared/hooks/useTenantId';
import { useToast } from '../../shared/hooks/useToast';
import type { BehaviorConfig } from '../../../types';

export function useBehavior() {
  const tenantId = useTenantId();
  const toast = useToast();
  const qc = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const query = useQuery({
    queryKey: ['behavior', tenantId],
    queryFn: () => getBehavior(tenantId),
  });

  const mutation = useMutation({
    mutationFn: (data: Partial<BehaviorConfig>) => saveBehavior(tenantId, data),
    onSuccess: updated => {
      qc.setQueryData(['behavior', tenantId], updated);
      toast.success('Comportamento salvo com sucesso!');
    },
    onError: () => toast.error('Erro ao salvar. Tente novamente.'),
  });

  const handlePreview = async () => {
    setLoadingPreview(true);
    const text = await previewResponse(tenantId);
    setPreview(text);
    setLoadingPreview(false);
  };

  return {
    ...query,
    save: mutation.mutate,
    isSaving: mutation.isPending,
    preview,
    loadingPreview,
    handlePreview,
  };
}

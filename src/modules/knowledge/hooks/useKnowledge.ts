import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getKnowledge, uploadDocument } from '../../../services/knowledge.service';
import { useTenantId } from '../../shared/hooks/useTenantId';
import { useToast } from '../../shared/hooks/useToast';

export function useKnowledge() {
  const tenantId = useTenantId();
  const toast = useToast();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['knowledge', tenantId],
    queryFn: () => getKnowledge(tenantId),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadDocument(tenantId, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['knowledge', tenantId] });
      toast.success('Arquivo enviado! Processando ingestão…');
    },
    onError: () => toast.error('Erro ao enviar arquivo.'),
  });

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach(f => uploadMutation.mutate(f));
  };

  return {
    ...query,
    isUploading: uploadMutation.isPending,
    handleFiles,
  };
}

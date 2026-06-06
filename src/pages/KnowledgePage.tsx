import { useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { useTenantId } from '../hooks/useTenantId';
import { useToast } from '../hooks/useToast';
import { getKnowledge, uploadDocument } from '../services/knowledge.service';
import { DocStatusBadge } from '../utils/ui/Badge';
import { PageHeader } from '../utils/ui/PageHeader';
import { Banner } from '../utils/ui/Banner';
import { LoadingState } from '../utils/ui/Spinner';
import { Card, CardTitle, CardSub } from '../styles/shared';
import { KbItem, KbLeft, KbIcon, KbName, KbMeta, UploadZone } from './KnowledgePage.styles';

export function KnowledgePage() {
  const tenantId = useTenantId();
  const { activeRole } = useAuthStore();
  const toast = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const isReadonly = activeRole === 'cliente';

  const { data: docs, isLoading } = useQuery({
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

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader eyebrow="RAG · tabela documents" title="Base de conhecimento" />

      <Banner>
        Documentos indexados alimentam o contexto RAG do agente SDR via busca semântica.
      </Banner>

      <Card>
        <CardTitle>Documentos do cliente <CardSub>tenant_id no metadata</CardSub></CardTitle>

        {docs?.map(doc => (
          <KbItem key={doc.id}>
            <KbLeft>
              <KbIcon>{doc.type}</KbIcon>
              <div>
                <KbName>{doc.name}</KbName>
                <KbMeta>
                  {doc.chunks != null ? `${doc.chunks} chunks · ` : ''}{doc.updatedAt}
                </KbMeta>
              </div>
            </KbLeft>
            <DocStatusBadge status={doc.status} />
          </KbItem>
        ))}

        {!docs?.length && (
          <KbMeta style={{ padding: '16px 0' }}>Nenhum documento indexado.</KbMeta>
        )}

        {!isReadonly && (
          <>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx,.csv"
              style={{ display: 'none' }}
              onChange={e => handleFiles(e.target.files)}
            />
            <UploadZone
              $dragging={dragging}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            >
              {uploadMutation.isPending
                ? 'Enviando…'
                : 'Arraste um arquivo ou clique para selecionar · dispara o subworkflow de ingestão'}
            </UploadZone>
          </>
        )}
      </Card>
    </div>
  );
}

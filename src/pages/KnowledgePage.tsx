import { useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { getKnowledge, uploadDocument } from '../services/knowledge.service';
import { DocStatusBadge } from '../components/ui/Badge';
import { LoadingState } from '../components/ui/Spinner';

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="17" height="17">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export function KnowledgePage() {
  const { activeTenantId, addToast } = useAppStore();
  const { activeRole, user } = useAuthStore();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const tenantId = activeRole === 'cliente'
    ? (user?.tenantId ?? activeTenantId)
    : activeTenantId;

  const isReadonly = activeRole === 'cliente';

  const { data: docs, isLoading } = useQuery({
    queryKey: ['knowledge', tenantId],
    queryFn: () => getKnowledge(tenantId),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadDocument(tenantId, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['knowledge', tenantId] });
      addToast('Arquivo enviado! Processando ingestão…', 'success');
    },
    onError: () => addToast('Erro ao enviar arquivo.', 'error'),
  });

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;
    Array.from(files).forEach(f => uploadMutation.mutate(f));
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">RAG · tabela documents</div>
          <h1>Base de conhecimento</h1>
        </div>
      </div>

      <div className="banner">
        <InfoIcon />
        Documentos indexados alimentam o contexto RAG do agente SDR via busca semântica.
      </div>

      <div className="card">
        <h3>Documentos do cliente <span className="sub">tenant_id no metadata</span></h3>

        {docs?.map(doc => (
          <div key={doc.id} className="kb-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
              <div className="kb-icon">{doc.type}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{doc.name}</div>
                <div className="muted">
                  {doc.chunks != null ? `${doc.chunks} chunks · ` : ''}{doc.updatedAt}
                </div>
              </div>
            </div>
            <DocStatusBadge status={doc.status} />
          </div>
        ))}

        {(!docs || docs.length === 0) && (
          <p className="muted" style={{ padding: '16px 0' }}>Nenhum documento indexado.</p>
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
            <div
              className="upload"
              style={{ borderColor: dragging ? 'var(--blue)' : undefined }}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => {
                e.preventDefault();
                setDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
            >
              {uploadMutation.isPending
                ? 'Enviando…'
                : 'Arraste um arquivo ou clique para selecionar · dispara o subworkflow de ingestão'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

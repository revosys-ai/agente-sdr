import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { getBehavior, saveBehavior, previewResponse } from '../services/behavior.service';
import { LoadingState, Spinner } from '../components/ui/Spinner';
import type { BehaviorConfig } from '../types';

const schema = z.object({
  personaNome: z.string().min(1),
  personaTom: z.string().min(1),
  personaDescricao: z.string().min(1),
  produtoDescricao: z.string().min(1),
  publicoAlvo: z.string().min(1),
  perguntas: z.string().min(1),
  criteriosQualificado: z.string().min(1),
  criteriosDesqualificado: z.string().min(1),
  linkAgendamento: z.string().url('URL inválida'),
  status: z.enum(['ativo', 'pausado']),
  promptExtra: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="15" height="15">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="17" height="17">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export function BehaviorPage() {
  const { activeTenantId } = useAppStore();
  const { activeRole, user } = useAuthStore();
  const { addToast } = useAppStore();
  const qc = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const tenantId = activeRole === 'cliente'
    ? (user?.tenantId ?? activeTenantId)
    : activeTenantId;

  const isReadonly = activeRole === 'cliente';

  const { data, isLoading } = useQuery({
    queryKey: ['behavior', tenantId],
    queryFn: () => getBehavior(tenantId),
  });

  const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) reset(data as FormData);
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (d: Partial<BehaviorConfig>) => saveBehavior(tenantId, d),
    onSuccess: (updated) => {
      qc.setQueryData(['behavior', tenantId], updated);
      addToast('Comportamento salvo com sucesso!', 'success');
    },
    onError: () => addToast('Erro ao salvar. Tente novamente.', 'error'),
  });

  const onSubmit = (d: FormData) => mutation.mutate(d);

  const handlePreview = async () => {
    setLoadingPreview(true);
    const text = await previewResponse(tenantId);
    setPreview(text);
    setLoadingPreview(false);
  };

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">Controles da IA</div>
          <h1>Comportamento</h1>
        </div>
        {isReadonly && (
          <span className="editlock">
            <LockIcon /> somente leitura
          </span>
        )}
      </div>

      <div className="banner">
        <span style={{ color: 'var(--cyan)', flexShrink: 0, display: 'flex' }}><InfoIcon /></span>
        Cada campo mapeia na tabela{' '}
        <span className="mono" style={{ margin: '0 4px' }}>SDR_CLIENTES</span>.
        Credenciais e prompt interno não aparecem aqui.
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 16 }}>

          <div className="card">
            <h3>Persona &amp; tom de voz</h3>
            <div className="field-row">
              <div className="field">
                <label>persona_nome</label>
                <input disabled={isReadonly} {...register('personaNome')} />
                {errors.personaNome && <p className="error-msg">Obrigatório</p>}
              </div>
              <div className="field">
                <label>persona_tom</label>
                <input disabled={isReadonly} {...register('personaTom')} />
              </div>
            </div>
            <div className="field">
              <label>persona_descricao</label>
              <textarea rows={2} disabled={isReadonly} {...register('personaDescricao')} />
            </div>
          </div>

          <div className="card">
            <h3>Contexto · produto e público</h3>
            <div className="field">
              <label>produto_descricao</label>
              <textarea rows={2} disabled={isReadonly} {...register('produtoDescricao')} />
            </div>
            <div className="field">
              <label>publico_alvo · ICP</label>
              <textarea rows={2} disabled={isReadonly} {...register('publicoAlvo')} />
            </div>
          </div>

          <div className="card">
            <h3>Roteiro de qualificação <span className="sub">perguntas_qualificacao</span></h3>
            <div className="field">
              <label>perguntas (uma por linha)</label>
              <textarea rows={6} disabled={isReadonly} {...register('perguntas')} />
            </div>
            <div className="field-row">
              <div className="field">
                <label>criterios_qualificado</label>
                <textarea rows={2} disabled={isReadonly} {...register('criteriosQualificado')} />
              </div>
              <div className="field">
                <label>criterios_desqualificado</label>
                <textarea rows={2} disabled={isReadonly} {...register('criteriosDesqualificado')} />
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Agendamento</h3>
            <div className="field-row">
              <div className="field">
                <label>link_agendamento</label>
                <input disabled={isReadonly} {...register('linkAgendamento')} />
                {errors.linkAgendamento && <p className="error-msg">{errors.linkAgendamento.message}</p>}
              </div>
              <div className="field">
                <label>status</label>
                <select disabled={isReadonly} {...register('status')}>
                  <option value="ativo">ativo</option>
                  <option value="pausado">pausado</option>
                </select>
              </div>
            </div>
          </div>

          {activeRole === 'equipe' && (
            <div className="card">
              <h3>Instruções avançadas <span className="sub">equipe · prompt_extra</span></h3>
              <div className="field">
                <textarea rows={2} {...register('promptExtra')} />
              </div>
            </div>
          )}

        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Pré-visualizar resposta <span className="sub">não dispara pro lead</span></h3>
          <button type="button" className="btn" onClick={handlePreview} disabled={loadingPreview}>
            {loadingPreview ? <Spinner size={16} /> : '▷ Gerar exemplo'}
          </button>
          {preview && <div className="preview-box">{preview}</div>}
        </div>

        {!isReadonly && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20 }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: 'auto', padding: '13px 26px' }}
              disabled={mutation.isPending || !isDirty}
            >
              {mutation.isPending ? <Spinner size={16} /> : 'Salvar alterações'}
            </button>
            <span className="muted">
              última edição {data?.lastEdit} · versão {data?.version}
            </span>
          </div>
        )}
      </form>
    </div>
  );
}

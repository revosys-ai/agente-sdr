import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/authStore';
import { useTenantId } from '../hooks/useTenantId';
import { useToast } from '../hooks/useToast';
import { getBehavior, saveBehavior, previewResponse } from '../services/behavior.service';
import { PageHeader } from '../utils/ui/PageHeader';
import { Banner } from '../utils/ui/Banner';
import { LoadingState, Spinner } from '../utils/ui/Spinner';
import {
  Card, CardTitle, CardSub, BtnPrimary, Btn,
  FieldRow, Field, FieldLabel, StyledInput, StyledTextarea, StyledSelect,
} from '../styles/shared';
import { EditLock, SaveBar, SaveMeta, PreviewBox, CardsStack } from './BehaviorPage.styles';
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
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

export function BehaviorPage() {
  const tenantId = useTenantId();
  const { activeRole } = useAuthStore();
  const toast = useToast();
  const qc = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const isReadonly = activeRole === 'cliente';

  const { data, isLoading } = useQuery({
    queryKey: ['behavior', tenantId],
    queryFn: () => getBehavior(tenantId),
  });

  const { register, reset, handleSubmit, formState: { errors, isDirty } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => { if (data) reset(data as FormData); }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (d: Partial<BehaviorConfig>) => saveBehavior(tenantId, d),
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

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        eyebrow="Controles da IA"
        title="Comportamento"
        action={isReadonly ? (
          <EditLock><LockIcon /> somente leitura</EditLock>
        ) : undefined}
      />

      <Banner>
        Cada campo mapeia na tabela{' '}
        <span style={{ fontFamily: 'JetBrains Mono', margin: '0 4px' }}>SDR_CLIENTES</span>.
        Credenciais e prompt interno não aparecem aqui.
      </Banner>

      <form onSubmit={handleSubmit(d => mutation.mutate(d))}>
        <CardsStack>
          <Card>
            <CardTitle>Persona &amp; tom de voz</CardTitle>
            <FieldRow>
              <Field>
                <FieldLabel>persona_nome</FieldLabel>
                <StyledInput disabled={isReadonly} {...register('personaNome')} />
                {errors.personaNome && <span style={{ color: '#ff7a6b', fontSize: 11 }}>Obrigatório</span>}
              </Field>
              <Field>
                <FieldLabel>persona_tom</FieldLabel>
                <StyledInput disabled={isReadonly} {...register('personaTom')} />
              </Field>
            </FieldRow>
            <Field>
              <FieldLabel>persona_descricao</FieldLabel>
              <StyledTextarea rows={2} disabled={isReadonly} {...register('personaDescricao')} />
            </Field>
          </Card>

          <Card>
            <CardTitle>Contexto · produto e público</CardTitle>
            <Field>
              <FieldLabel>produto_descricao</FieldLabel>
              <StyledTextarea rows={2} disabled={isReadonly} {...register('produtoDescricao')} />
            </Field>
            <Field>
              <FieldLabel>publico_alvo · ICP</FieldLabel>
              <StyledTextarea rows={2} disabled={isReadonly} {...register('publicoAlvo')} />
            </Field>
          </Card>

          <Card>
            <CardTitle>Roteiro de qualificação <CardSub>perguntas_qualificacao</CardSub></CardTitle>
            <Field>
              <FieldLabel>perguntas (uma por linha)</FieldLabel>
              <StyledTextarea rows={6} disabled={isReadonly} {...register('perguntas')} />
            </Field>
            <FieldRow>
              <Field>
                <FieldLabel>criterios_qualificado</FieldLabel>
                <StyledTextarea rows={2} disabled={isReadonly} {...register('criteriosQualificado')} />
              </Field>
              <Field>
                <FieldLabel>criterios_desqualificado</FieldLabel>
                <StyledTextarea rows={2} disabled={isReadonly} {...register('criteriosDesqualificado')} />
              </Field>
            </FieldRow>
          </Card>

          <Card>
            <CardTitle>Agendamento</CardTitle>
            <FieldRow>
              <Field>
                <FieldLabel>link_agendamento</FieldLabel>
                <StyledInput disabled={isReadonly} {...register('linkAgendamento')} />
                {errors.linkAgendamento && (
                  <span style={{ color: '#ff7a6b', fontSize: 11 }}>{errors.linkAgendamento.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel>status</FieldLabel>
                <StyledSelect disabled={isReadonly} {...register('status')}>
                  <option value="ativo">ativo</option>
                  <option value="pausado">pausado</option>
                </StyledSelect>
              </Field>
            </FieldRow>
          </Card>

          {activeRole === 'equipe' && (
            <Card>
              <CardTitle>Instruções avançadas <CardSub>equipe · prompt_extra</CardSub></CardTitle>
              <Field>
                <StyledTextarea rows={2} {...register('promptExtra')} />
              </Field>
            </Card>
          )}
        </CardsStack>

        <Card style={{ marginTop: 16 }}>
          <CardTitle>Pré-visualizar resposta <CardSub>não dispara pro lead</CardSub></CardTitle>
          <Btn type="button" onClick={handlePreview} disabled={loadingPreview}>
            {loadingPreview ? <Spinner size={16} /> : '▷ Gerar exemplo'}
          </Btn>
          {preview && <PreviewBox>{preview}</PreviewBox>}
        </Card>

        {!isReadonly && (
          <SaveBar>
            <BtnPrimary type="submit" disabled={mutation.isPending || !isDirty}>
              {mutation.isPending ? <Spinner size={16} /> : 'Salvar alterações'}
            </BtnPrimary>
            <SaveMeta>última edição {data?.lastEdit} · versão {data?.version}</SaveMeta>
          </SaveBar>
        )}
      </form>
    </div>
  );
}

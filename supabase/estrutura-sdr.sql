-- ============================================================
-- AGENTE SDR - ESTRUTURA DO BANCO DE DADOS
-- Execute no Supabase SQL Editor (projeto dedicado ao SDR)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================================
-- SDR_CLIENTES: configuração do agente por tenant
-- ============================================================
CREATE TABLE IF NOT EXISTS SDR_CLIENTES (
  id                       UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id                TEXT UNIQUE NOT NULL,
  nome_empresa             TEXT NOT NULL,
  -- Persona
  persona_nome             TEXT NOT NULL DEFAULT 'Ana',
  persona_descricao        TEXT,
  persona_tom              TEXT DEFAULT 'profissional e consultivo',
  -- Produto / Solução
  produto_descricao        TEXT,
  publico_alvo             TEXT,             -- ICP: perfil do cliente ideal
  -- Qualificação
  perguntas_qualificacao   TEXT,             -- perguntas BANT/SPIN a fazer ao longo da conversa
  criterios_qualificado    TEXT,             -- o que define um lead qualificado
  criterios_desqualificado TEXT,             -- o que descarta o lead
  -- Agendamento
  link_agendamento         TEXT,             -- Calendly ou similar
  instrucoes_agendamento   TEXT,             -- como apresentar o próximo passo
  -- Objeções
  objecoes_comuns          TEXT,
  -- Extra
  prompt_extra             TEXT,
  status                   TEXT DEFAULT 'ativo',
  created_at               TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LEADS: pipeline de qualificação por tenant
-- ============================================================
CREATE TABLE IF NOT EXISTS LEADS (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id           TEXT NOT NULL,
  telefone            TEXT NOT NULL,
  nome                TEXT,
  empresa             TEXT,
  cargo               TEXT,
  email               TEXT,
  -- Campos BANT (preenchidos conforme a conversa avança)
  budget              TEXT,
  authority           TEXT,
  need                TEXT,
  timeline            TEXT,
  -- Status do lead
  status              TEXT DEFAULT 'novo',
  -- novo | qualificando | qualificado | reuniao_agendada | desqualificado | perdido
  score               INTEGER DEFAULT 0,
  notas               TEXT,
  reuniao_agendada_em TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (tenant_id, telefone)
);

CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON LEADS
  FOR EACH ROW EXECUTE FUNCTION update_leads_updated_at();

-- ============================================================
-- BASE DE CONHECIMENTO (RAG) — mesma estrutura padrão n8n
-- ============================================================
CREATE TABLE IF NOT EXISTS documents (
  id        BIGSERIAL PRIMARY KEY,
  content   TEXT,
  metadata  JSONB,
  embedding VECTOR(1536)
);

CREATE INDEX IF NOT EXISTS documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_count     INT DEFAULT 5,
  filter          JSONB DEFAULT '{}'
)
RETURNS TABLE (id BIGINT, content TEXT, metadata JSONB, similarity FLOAT)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE metadata @> filter
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================================
-- INSERT DE DEMONSTRAÇÃO — TechSolve (Software B2B)
-- ============================================================
INSERT INTO SDR_CLIENTES (
  tenant_id, nome_empresa, persona_nome, persona_descricao, persona_tom,
  produto_descricao, publico_alvo, perguntas_qualificacao,
  criterios_qualificado, criterios_desqualificado,
  link_agendamento, instrucoes_agendamento, objecoes_comuns
) VALUES (
  'demo-sdr',

  'TechSolve',

  'Ana',

  'SDR da TechSolve, empresa especializada em automação de processos para pequenas e médias empresas',

  'profissional, consultivo e direto — focado em entender a dor do lead antes de falar de produto',

  'Plataforma de automação de processos internos (RPA + IA) que elimina trabalho manual e reduz erros operacionais. Casos de uso: financeiro, RH, logística e atendimento ao cliente.',

  'Empresas com 20 a 500 funcionários que ainda realizam processos manuais repetitivos. Decisores ideais: CEO, COO, Gerente de TI ou Gerente Financeiro.',

  'Perguntas de qualificação — faça uma por vez, de forma natural e consultiva:
1. Qual o seu nome e empresa?
2. Qual é o seu papel na empresa?
3. Qual processo você mais gostaria de automatizar hoje?
4. Quantas pessoas estão envolvidas nesse processo atualmente?
5. Vocês já tentaram alguma solução para isso antes? Como foi?
6. Isso está gerando algum custo ou problema específico que você possa compartilhar?
7. Se resolvêssemos isso, qual seria o impacto para o negócio?
8. Você teria autonomia para avaliar e contratar uma solução como essa?
9. Qual seria o prazo ideal para começar?',

  'Lead QUALIFICADO quando atender 3 ou mais dos critérios abaixo:
- É decisor ou influenciador direto na compra
- Identifica claramente um processo manual que quer automatizar
- Empresa com 10 ou mais funcionários
- Tem senso de urgência (quer resolver nos próximos 3 meses)',

  'Lead DESQUALIFICADO quando:
- Não é decisor e não tem acesso ao decisor
- Não identifica nenhum processo para automatizar
- Empresa com menos de 5 funcionários
- Demonstra desinteresse total após 3 tentativas de engajamento',

  'https://calendly.com/techsolve/demo-30min',

  'Quando o lead estiver qualificado, apresente o próximo passo: "Ótimo, [Nome]! Com base no que você me contou, acredito muito que temos uma solução que pode transformar esse processo. Que tal agendar uma conversa de 30 minutos com nosso especialista para mostrar como funciona na prática? Sem compromisso — você escolhe o horário aqui: [link_agendamento]"',

  'OBJEÇÕES COMUNS E COMO RESPONDER:
- "Não tenho tempo agora" → "Entendo! A conversa é de apenas 30 min e pode ser online. Você escolhe o horário mais conveniente — vale muito a pena. Posso te enviar o link?"
- "Já tentamos algo assim e não funcionou" → "Que bom saber isso! Me conta mais sobre essa experiência? Entender o que não funcionou nos ajuda a mostrar como nossa abordagem é diferente."
- "Qual o preço?" → "Antes de falar de investimento, você conseguiria estimar quanto esse processo custa hoje em horas de trabalho e retrabalho? Assim consigo mostrar o ROI de forma mais concreta."
- "Manda mais informações por e-mail" → "Com prazer! Mas para enviar algo realmente relevante para o seu caso, posso te fazer só mais uma pergunta rápida?"
- "Preciso consultar meu sócio / chefe" → "Faz total sentido! Você acha que ele/ela teria interesse em participar da demonstração? Assim consigo apresentar para vocês dois ao mesmo tempo."'
);

-- ============================================================
-- TEMPLATE GENÉRICO (descomente para usar como base)
-- ============================================================

-- INSERT INTO SDR_CLIENTES (tenant_id, nome_empresa, persona_nome, persona_descricao, persona_tom,
--   produto_descricao, publico_alvo, perguntas_qualificacao,
--   criterios_qualificado, criterios_desqualificado,
--   link_agendamento, instrucoes_agendamento, objecoes_comuns)
-- VALUES (
--   'meu-cliente-sdr',
--   'Nome da Empresa',
--   'Nome do SDR',
--   'descrição da persona e da empresa',
--   'tom de abordagem',
--   'descrição do produto ou serviço',
--   'perfil do cliente ideal (ICP)',
--   'perguntas de qualificação numeradas',
--   'critérios para considerar o lead qualificado',
--   'critérios para desqualificar o lead',
--   'https://calendly.com/seu-link',
--   'instrução de como oferecer o agendamento',
--   'objeções comuns e respostas'
-- );

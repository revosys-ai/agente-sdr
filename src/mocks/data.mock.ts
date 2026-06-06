import type { Lead, Client, BehaviorConfig, KnowledgeDoc, OverviewMetrics, FunnelData } from '../types';

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c1',
    name: 'Clínica Sorriso',
    tenantId: 'sorriso-odonto',
    metrics: { leads: 96, qualification: 41, meetings: 27, health: 82, status: 'saudavel' },
  },
  {
    id: 'c2',
    name: 'TechSolve',
    tenantId: 'demo-sdr',
    metrics: { leads: 142, qualification: 33, meetings: 18, health: 64, status: 'ok' },
  },
  {
    id: 'c3',
    name: 'LogPro',
    tenantId: 'logpro',
    metrics: { leads: 58, qualification: 28, meetings: 11, health: 51, status: 'atencao' },
  },
  {
    id: 'c4',
    name: 'Contábil Prima',
    tenantId: 'prima',
    metrics: { leads: 73, qualification: 22, meetings: 9, health: 38, status: 'ajustar' },
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Rafael Lima',
    company: 'Móveis Norte',
    role: 'COO',
    bant: { budget: true, authority: true, need: true, timeline: true },
    score: 84,
    status: 'reuniao_agendada',
    updatedAt: '2h atrás',
    tenantId: 'demo-sdr',
  },
  {
    id: 'l2',
    name: 'Carla Souza',
    company: 'Delta Log',
    role: 'Ger. TI',
    bant: { budget: true, authority: true, need: true, timeline: null },
    score: 71,
    status: 'qualificado',
    updatedAt: '5h atrás',
    tenantId: 'demo-sdr',
  },
  {
    id: 'l3',
    name: 'Bruno Alves',
    company: '—',
    role: '—',
    bant: { budget: null, authority: null, need: true, timeline: null },
    score: 33,
    status: 'qualificando',
    updatedAt: 'ontem',
    tenantId: 'demo-sdr',
  },
  {
    id: 'l4',
    name: 'Patrícia M.',
    company: 'Contábil Sul',
    role: 'Sócia',
    bant: { budget: null, authority: true, need: true, timeline: true },
    score: 62,
    status: 'qualificado',
    updatedAt: 'ontem',
    tenantId: 'demo-sdr',
  },
  {
    id: 'l5',
    name: '—',
    company: '—',
    role: '—',
    bant: { budget: null, authority: null, need: null, timeline: null },
    score: 0,
    status: 'novo',
    updatedAt: 'há 1 min',
    tenantId: 'demo-sdr',
  },
  {
    id: 'l6',
    name: 'João Pedro',
    company: 'StartX',
    role: 'Estagiário',
    bant: { budget: null, authority: false, need: null, timeline: null },
    score: 12,
    status: 'desqualificado',
    updatedAt: '2 dias',
    tenantId: 'demo-sdr',
  },
  // Leads para Clínica Sorriso
  {
    id: 'l7',
    name: 'Ana Paula',
    company: 'Beleza Total',
    role: 'Diretora',
    bant: { budget: true, authority: true, need: true, timeline: true },
    score: 91,
    status: 'reuniao_agendada',
    updatedAt: '1h atrás',
    tenantId: 'sorriso-odonto',
  },
  {
    id: 'l8',
    name: 'Roberto Silva',
    company: 'Clínica Nova',
    role: 'Sócio',
    bant: { budget: true, authority: true, need: null, timeline: null },
    score: 54,
    status: 'qualificando',
    updatedAt: 'hoje',
    tenantId: 'sorriso-odonto',
  },
];

export const MOCK_BEHAVIOR: Record<string, BehaviorConfig> = {
  'demo-sdr': {
    personaNome: 'Ana',
    personaTom: 'profissional, consultivo e direto',
    personaDescricao: 'SDR da TechSolve, empresa de automação de processos para pequenas e médias empresas.',
    produtoDescricao: 'Plataforma de automação (RPA + IA) que elimina trabalho manual. Casos: financeiro, RH, logística, atendimento.',
    publicoAlvo: 'Empresas de 20 a 500 funcionários com processos manuais. Decisores: CEO, COO, Ger. TI ou Financeiro.',
    perguntas: `1. Qual o seu nome e empresa?
2. Qual é o seu papel na empresa?
3. Qual processo você mais gostaria de automatizar?
4. Vocês já tentaram alguma solução antes?
5. Qual o tamanho da equipe afetada?
6. Qual o impacto financeiro desse processo manual?
7. Existe orçamento previsto para automação?
8. Qual o prazo para decisão?
9. Quem mais participa da decisão?`,
    criteriosQualificado: 'É decisor; identifica processo manual; 10+ funcionários; urgência em 3 meses.',
    criteriosDesqualificado: 'Não é decisor; sem processo a automatizar; menos de 5 func.',
    linkAgendamento: 'https://calendly.com/techsolve/demo-30min',
    status: 'ativo',
    promptExtra: 'Nunca prometer prazos de implantação. Encaminhar para humano se mencionar contrato.',
    lastEdit: 'há 3 dias',
    version: 7,
  },
  'sorriso-odonto': {
    personaNome: 'Sofia',
    personaTom: 'acolhedor, empático e profissional',
    personaDescricao: 'SDR da Clínica Sorriso, especialista em odontologia estética e saúde bucal.',
    produtoDescricao: 'Serviços odontológicos premium: implantes, alinhadores, clareamento e estética dental.',
    publicoAlvo: 'Adultos 25-55 anos com interesse em saúde bucal e estética. Foco em planos particulares.',
    perguntas: `1. Como posso te chamar?
2. O que te motivou a entrar em contato?
3. Você tem alguma queixa específica que gostaria de resolver?
4. Já faz acompanhamento odontológico regular?
5. Qual região da cidade você mora?
6. Você tem plano odontológico ou prefere particular?`,
    criteriosQualificado: 'Interesse em procedimento estético ou implante; sem plano ou aceita particular; disponibilidade em 30 dias.',
    criteriosDesqualificado: 'Busca apenas emergência; fora da região de atendimento.',
    linkAgendamento: 'https://calendly.com/clinica-sorriso/avaliacao',
    status: 'ativo',
    lastEdit: 'há 1 semana',
    version: 3,
  },
  'logpro': {
    personaNome: 'Leo',
    personaTom: 'direto, objetivo e técnico',
    personaDescricao: 'SDR da LogPro, especialista em soluções de logística e rastreamento.',
    produtoDescricao: 'Software de gestão logística com rastreamento em tempo real, roteirização inteligente e relatórios automáticos.',
    publicoAlvo: 'Transportadoras e distribuidoras com frota própria acima de 10 veículos.',
    perguntas: `1. Quantos veículos compõem a frota?
2. Qual o principal desafio logístico hoje?
3. Usam algum sistema de rastreamento?
4. Qual o volume de entregas por mês?`,
    criteriosQualificado: 'Frota 10+ veículos; sem sistema ou insatisfeito com atual; decisor presente.',
    criteriosDesqualificado: 'Frota menor que 5; não é o decisor da compra.',
    linkAgendamento: 'https://calendly.com/logpro/demo',
    status: 'ativo',
    lastEdit: 'há 5 dias',
    version: 4,
  },
  'prima': {
    personaNome: 'Clara',
    personaTom: 'formal, preciso e consultivo',
    personaDescricao: 'SDR da Contábil Prima, escritório de contabilidade especializado em PMEs.',
    produtoDescricao: 'Serviços contábeis completos: fiscal, trabalhista, societário e consultoria financeira.',
    publicoAlvo: 'Empresas com faturamento entre R$1M e R$30M que buscam contabilidade de qualidade.',
    perguntas: `1. Qual o segmento da empresa?
2. Qual o faturamento aproximado?
3. Está satisfeito com a contabilidade atual?
4. Qual a maior dor contábil hoje?`,
    criteriosQualificado: 'Faturamento acima de R$500k; insatisfação com contador atual; sócio ou CFO na conversa.',
    criteriosDesqualificado: 'MEI ou microempresa com faturamento muito baixo; recém-abriu com serviços básicos.',
    linkAgendamento: 'https://calendly.com/prima/consulta',
    status: 'pausado',
    lastEdit: 'há 2 semanas',
    version: 2,
  },
};

export const MOCK_KNOWLEDGE: Record<string, KnowledgeDoc[]> = {
  'demo-sdr': [
    { id: 'k1', name: 'Apresentacao-comercial.pdf', type: 'PDF', chunks: 42, status: 'indexado', updatedAt: 'há 5 dias', tenantId: 'demo-sdr' },
    { id: 'k2', name: 'FAQ-objecoes.txt', type: 'TXT', chunks: 18, status: 'indexado', updatedAt: 'há 2 dias', tenantId: 'demo-sdr' },
    { id: 'k3', name: 'Casos-de-sucesso.docx', type: 'DOC', chunks: null, status: 'ingestao', updatedAt: 'agora', tenantId: 'demo-sdr' },
  ],
  'sorriso-odonto': [
    { id: 'k4', name: 'Tabela-procedimentos.pdf', type: 'PDF', chunks: 15, status: 'indexado', updatedAt: 'há 3 dias', tenantId: 'sorriso-odonto' },
    { id: 'k5', name: 'Objecoes-plano-particular.txt', type: 'TXT', chunks: 9, status: 'indexado', updatedAt: 'há 1 semana', tenantId: 'sorriso-odonto' },
  ],
  'logpro': [
    { id: 'k6', name: 'Pitch-LogPro.pdf', type: 'PDF', chunks: 28, status: 'indexado', updatedAt: 'há 4 dias', tenantId: 'logpro' },
  ],
  'prima': [
    { id: 'k7', name: 'Servicos-Prima.pdf', type: 'PDF', chunks: null, status: 'erro', updatedAt: 'há 10 dias', tenantId: 'prima' },
  ],
};

export const MOCK_OVERVIEW: Record<string, { metrics: OverviewMetrics; funnel: FunnelData }> = {
  'demo-sdr': {
    metrics: { leads: 142, leadsChange: 18, qualificationRate: 33, meetings: 18, meetingsChange: 6, avgScore: 62, avgScoreChange: -2 },
    funnel: { received: 142, qualifying: 104, qualified: 47, meeting: 18 },
  },
  'sorriso-odonto': {
    metrics: { leads: 96, leadsChange: 23, qualificationRate: 41, meetings: 27, meetingsChange: 8, avgScore: 71, avgScoreChange: 3 },
    funnel: { received: 96, qualifying: 68, qualified: 39, meeting: 27 },
  },
  'logpro': {
    metrics: { leads: 58, leadsChange: 5, qualificationRate: 28, meetings: 11, meetingsChange: -1, avgScore: 55, avgScoreChange: -4 },
    funnel: { received: 58, qualifying: 38, qualified: 16, meeting: 11 },
  },
  'prima': {
    metrics: { leads: 73, leadsChange: -3, qualificationRate: 22, meetings: 9, meetingsChange: 0, avgScore: 48, avgScoreChange: -6 },
    funnel: { received: 73, qualifying: 45, qualified: 16, meeting: 9 },
  },
};

export function delay(ms = 400): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

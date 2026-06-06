export type UserRole = 'cliente' | 'equipe';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  tenantId?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
}

export type LeadStatus = 'novo' | 'qualificando' | 'qualificado' | 'reuniao_agendada' | 'desqualificado';

export interface BantScore {
  budget: boolean | null;
  authority: boolean | null;
  need: boolean | null;
  timeline: boolean | null;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  role: string;
  bant: BantScore;
  score: number;
  status: LeadStatus;
  updatedAt: string;
  tenantId: string;
}

export interface ClientMetrics {
  leads: number;
  qualification: number;
  meetings: number;
  health: number;
  status: 'saudavel' | 'ok' | 'atencao' | 'ajustar';
}

export interface Client {
  id: string;
  name: string;
  tenantId: string;
  metrics: ClientMetrics;
}

export interface BehaviorConfig {
  personaNome: string;
  personaTom: string;
  personaDescricao: string;
  produtoDescricao: string;
  publicoAlvo: string;
  perguntas: string;
  criteriosQualificado: string;
  criteriosDesqualificado: string;
  linkAgendamento: string;
  status: 'ativo' | 'pausado';
  promptExtra?: string;
  lastEdit: string;
  version: number;
}

export type DocStatus = 'indexado' | 'ingestao' | 'erro';

export interface KnowledgeDoc {
  id: string;
  name: string;
  type: 'PDF' | 'TXT' | 'DOC' | 'CSV';
  chunks: number | null;
  status: DocStatus;
  updatedAt: string;
  tenantId: string;
}

export interface OverviewMetrics {
  leads: number;
  leadsChange: number;
  qualificationRate: number;
  meetings: number;
  meetingsChange: number;
  avgScore: number;
  avgScoreChange: number;
}

export interface FunnelData {
  received: number;
  qualifying: number;
  qualified: number;
  meeting: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

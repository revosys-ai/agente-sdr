import type { User, AuthTokens } from '../types';

function encodeJWT(payload: object): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  // In production this would be a real HMAC signature
  const sig = btoa(`mock-sig-${Date.now()}`);
  return `${header}.${body}.${sig}`;
}

export interface MockUserRecord {
  email: string;
  password: string;
  user: User;
}

export const MOCK_USERS: MockUserRecord[] = [
  {
    email: 'marina@revosys.io',
    password: 'revosys2024',
    user: {
      id: 'usr_001',
      name: 'Marina Duarte',
      email: 'marina@revosys.io',
      role: 'equipe',
      initials: 'MD',
    },
  },
  {
    email: 'cliente@techsolve.com',
    password: 'techsolve123',
    user: {
      id: 'usr_002',
      name: 'Carlos Tech',
      email: 'cliente@techsolve.com',
      role: 'cliente',
      initials: 'CT',
      tenantId: 'demo-sdr',
    },
  },
  {
    email: 'sorriso@clinica.com',
    password: 'sorriso123',
    user: {
      id: 'usr_003',
      name: 'Dra. Lucia Sorriso',
      email: 'sorriso@clinica.com',
      role: 'cliente',
      initials: 'LS',
      tenantId: 'sorriso-odonto',
    },
  },
];

export function mockLogin(email: string, password: string): { user: User; tokens: AuthTokens } | null {
  const record = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!record) return null;

  const now = Date.now();
  const expiresAt = now + 3600 * 1000; // 1h

  const accessToken = encodeJWT({
    sub: record.user.id,
    email: record.user.email,
    role: record.user.role,
    iat: Math.floor(now / 1000),
    exp: Math.floor(expiresAt / 1000),
  });

  const refreshToken = encodeJWT({
    sub: record.user.id,
    type: 'refresh',
    iat: Math.floor(now / 1000),
    exp: Math.floor((now + 7 * 24 * 3600 * 1000) / 1000),
  });

  return { user: record.user, tokens: { accessToken, refreshToken, expiresAt } };
}

export function mockRefresh(refreshToken: string): AuthTokens | null {
  try {
    const parts = refreshToken.split('.');
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp * 1000 < Date.now()) return null;

    const now = Date.now();
    const expiresAt = now + 3600 * 1000;
    return {
      accessToken: encodeJWT({ sub: payload.sub, iat: Math.floor(now / 1000), exp: Math.floor(expiresAt / 1000) }),
      refreshToken,
      expiresAt,
    };
  } catch {
    return null;
  }
}

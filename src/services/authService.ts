import type { AuthSession, User } from '@/types';
import { DEMO_CREDENTIALS, MOCK_USERS } from '@/mocks/users';
import { mockDelay } from '@/mocks/taskStore';

const AUTH_KEY = 'taskflow_auth';
const TOKEN_KEY = 'taskflow_token';

export async function loginRequest(
  email: string,
  password: string,
): Promise<AuthSession> {
  await mockDelay(400, 900);

  const normalizedEmail = email.trim();
  const normalizedPassword = password.trim();

  if (
    normalizedEmail === DEMO_CREDENTIALS.email &&
    normalizedPassword === DEMO_CREDENTIALS.password
  ) {
    const user = MOCK_USERS[0];
    const session: AuthSession = {
      token: `mock-jwt-${Date.now()}`,
      user,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    localStorage.setItem(TOKEN_KEY, session.token);
    return session;
  }

  const match = MOCK_USERS.find((u) => u.email === normalizedEmail);
  if (match && normalizedPassword.length >= 6) {
    const session: AuthSession = {
      token: `mock-jwt-${Date.now()}`,
      user: match,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    localStorage.setItem(TOKEN_KEY, session.token);
    return session;
  }

  throw new Error('Invalid email or password');
}

export function loadStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser(): User | null {
  return loadStoredSession()?.user ?? null;
}

export async function validateSession(): Promise<User | null> {
  await mockDelay(100, 300);
  const session = loadStoredSession();
  if (!session) return null;
  return session.user;
}

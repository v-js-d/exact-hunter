import { http, HttpResponse } from 'msw';

/** Дублирует контракт API / entities.user; shared не импортирует entities (FSD). */
type MockUserRole = 'CANDIDATE' | 'RECRUITER';

const MOCK_ROLE_ALLOWLIST = {
  CANDIDATE: true,
  RECRUITER: true,
} as const satisfies Record<MockUserRole, true>;

function isMockUserRole(value: unknown): value is MockUserRole {
  return typeof value === 'string' && value in MOCK_ROLE_ALLOWLIST;
}

interface MockUser {
  id: string;
  email: string;
  password: string;
  role: MockUserRole;
}

const mockUsers = new Map<string, MockUser>();
const refreshTokenToUserId = new Map<string, string>();
const accessTokenToUserId = new Map<string, string>();

let tokenCounter = 0;

function generateToken(prefix: string): string {
  tokenCounter += 1;
  return `${prefix}_${Date.now()}_${tokenCounter}`;
}

// HttpOnly в MSW технически невозможен MSW под капотом записывает Set-Cookie через document.cookie,
// если указать HttpOnly - браузер отбросит куку
// Упрощение для MSW: в проде refresh лежит в HttpOnly cookie (недоступен из JS).
// В моке задаём cookie через document.cookie, чтобы симулировать выдачу refresh.
function setRefreshCookie(token: string) {
  document.cookie = `refreshToken=${token}; path=/; SameSite=Lax; max-age=604800`;
}

function clearRefreshCookie() {
  document.cookie = 'refreshToken=; path=/; SameSite=Lax; max-age=0';
}

function getRefreshTokenFromCookie(cookieHeader: string): string | null {
  const match = cookieHeader.match(/refreshToken=([^;]+)/);
  return match?.[1] ?? null;
}

function createTokenPair(userId: string) {
  const accessToken = generateToken('access');
  const refreshToken = generateToken('refresh');

  accessTokenToUserId.set(accessToken, userId);
  refreshTokenToUserId.set(refreshToken, userId);

  setRefreshCookie(refreshToken);

  return {
    accessToken,
    refreshToken,
  };
}

function getUserByAccessToken(authHeader: string | null): MockUser | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.slice(7);
  const userId = accessTokenToUserId.get(token);

  if (!userId) {
    return null;
  }

  return mockUsers.get(userId) ?? null;
}

const BASE = '/auth';

export const authHandlers = [
  http.post(`${BASE}/register`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      role?: unknown;
    };

    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

    if (!isMockUserRole(body.role)) {
      return HttpResponse.json(
        { message: 'Valid role (CANDIDATE or RECRUITER) is required' },
        { status: 400 },
      );
    }

    const role = body.role;

    const existingUser = Array.from(mockUsers.values()).find(
      (u) => u.email === body.email,
    );

    if (existingUser) {
      return HttpResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      );
    }

    const id = crypto.randomUUID();
    const user: MockUser = {
      id,
      email: body.email,
      password: body.password,
      role,
    };

    mockUsers.set(id, user);

    const { accessToken } = createTokenPair(id);

    return HttpResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }),

  http.post(`${BASE}/login`, async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
      role?: unknown;
    };

    const user = Array.from(mockUsers.values()).find(
      (u) => u.email === body.email && u.password === body.password,
    );

    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    if (body.role !== undefined && isMockUserRole(body.role)) {
      if (body.role !== user.role) {
        return HttpResponse.json(
          { message: 'Роль не совпадает с аккаунтом' },
          { status: 403 },
        );
      }
    }

    const { accessToken } = createTokenPair(user.id);

    return HttpResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }),

  http.post(`${BASE}/refresh`, () => {
    // для моковых запросов cookie берем из document.cookie из-за технических ограничений MSW.
    // В проде refresh лежит в HttpOnly cookie и не доступен для js.
    // const cookieHeader = request.headers.get('cookie');
    const cookieHeader = document.cookie;
    const refreshToken = getRefreshTokenFromCookie(cookieHeader);

    if (!refreshToken) {
      return HttpResponse.json(
        { message: 'No refresh token' },
        { status: 401 },
      );
    }

    const userId = refreshTokenToUserId.get(refreshToken);

    if (!userId) {
      return HttpResponse.json(
        { message: 'Invalid refresh token' },
        { status: 401 },
      );
    }

    refreshTokenToUserId.delete(refreshToken);

    const user = mockUsers.get(userId);
    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid refresh token' },
        { status: 401 },
      );
    }

    const { accessToken } = createTokenPair(userId);

    return HttpResponse.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }),

  http.post(`${BASE}/logout`, ({ request }) => {
    // для моковых запросов cookie берем из document.cookie из-за технических ограничений MSW.
    // В проде refresh лежит в HttpOnly cookie и не доступен для js.
    // const cookieHeader = request.headers.get('cookie');
    const cookieHeader = document.cookie;
    const refreshToken = getRefreshTokenFromCookie(cookieHeader);

    if (refreshToken) {
      refreshTokenToUserId.delete(refreshToken);
    }

    const authHeader = request.headers.get('authorization');

    if (authHeader?.startsWith('Bearer ')) {
      accessTokenToUserId.delete(authHeader.slice(7));
    }

    clearRefreshCookie();

    return HttpResponse.json({ message: 'Logged out' });
  }),

  http.get(`${BASE}/me`, ({ request }) => {
    const authHeader = request.headers.get('authorization');
    const user = getUserByAccessToken(authHeader);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  }),
];

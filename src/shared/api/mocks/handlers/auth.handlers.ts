import { http, HttpResponse } from 'msw';

interface MockUser {
  id: string;
  email: string;
  password: string;
  role: string;
}

const mockUsers = new Map<string, MockUser>();
const refreshTokenToUserId = new Map<string, string>();
const accessTokenToUserId = new Map<string, string>();

let tokenCounter = 0;

function generateToken(prefix: string): string {
  tokenCounter += 1;
  return `${prefix}_${Date.now()}_${tokenCounter}`;
}

function setRefreshCookie(token: string) {
  document.cookie = `refreshToken=${token}; path=/; SameSite=Lax; max-age=604800`;
}

function clearRefreshCookie() {
  document.cookie = 'refreshToken=; path=/; SameSite=Lax; max-age=0';
}

function getRefreshTokenFromCookie(cookieHeader: string | null): string | null {
  const source = cookieHeader || document.cookie;
  const match = source.match(/refreshToken=([^;]+)/);
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
    };

    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: 'Email and password are required' },
        { status: 400 },
      );
    }

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
      role: 'user',
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

  http.post(`${BASE}/refresh`, ({ request }) => {
    const cookieHeader = request.headers.get('cookie');
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

    const { accessToken } = createTokenPair(userId);

    return HttpResponse.json({ accessToken });
  }),

  http.post(`${BASE}/logout`, ({ request }) => {
    const cookieHeader = request.headers.get('cookie');
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

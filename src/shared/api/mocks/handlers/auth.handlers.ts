import { http, HttpResponse } from 'msw';

/** Дублирует контракт API / entities.user; shared не импортирует entities (FSD). */
type MockUserRole = 'CANDIDATE' | 'RECRUITER';

const MOCK_ROLE_ALLOWLIST = {
  CANDIDATE: true,
  RECRUITER: true,
} as const satisfies Record<MockUserRole, true>;

const AUTH_METHODS = {
  phone: 'phone',
  email: 'email',
} as const;

function isMockUserRole(value: unknown): value is MockUserRole {
  return typeof value === 'string' && value in MOCK_ROLE_ALLOWLIST;
}
interface MockUserPhone {
  id: string;
  countryCode: string;
  phone: string;
  password: string;
  role: MockUserRole;
}

interface MockUserEmail {
  id: string;
  email: string;
  password: string;
  role: MockUserRole;
}

type MockUser = MockUserEmail | MockUserPhone;

// new
interface RequestUserPhone {
  countryCode: string;
  phone: string;
  password: string;
  role: MockUserRole;
}
// new
interface RequestUserEmail {
  email: string;
  password: string;
  role: MockUserRole;
}

type RequestUser = RequestUserPhone | RequestUserEmail;

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

const createAccessToken = () => {
  const id = crypto.randomUUID();
  const { accessToken } = createTokenPair(id);

  return {
    id,
    accessToken,
  };
};

const userResponse = (user: MockUser) => {
  if (AUTH_METHODS.email in user) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }

  return {
    id: user.id,
    countryCode: user.countryCode,
    phone: user.phone,
    password: user.password,
    role: user.role,
  };
};

export const authHandlers = [
  http.post(`${BASE}/register`, async ({ request }) => {
    const body = (await request.json()) as RequestUser;

    const isMethodEmail = AUTH_METHODS.email in body;
    const isMethodPhone = AUTH_METHODS.phone in body;

    if (!isMockUserRole(body.role)) {
      return HttpResponse.json(
        { message: 'Valid role (CANDIDATE or RECRUITER) is required' },
        { status: 400 },
      );
    }

    if (isMethodPhone) {
      const { countryCode, password, phone, role } = body;

      if (!countryCode || !phone || !password) {
        return HttpResponse.json(
          {
            message: 'Invalid number data or password',
            type: AUTH_METHODS.phone,
          },
          { status: 400 },
        );
      }

      const existingUser = Array.from(mockUsers.values()).find(
        (u): u is MockUserPhone =>
          AUTH_METHODS.phone in u &&
          u.phone === phone &&
          u.countryCode === countryCode &&
          u.password === password,
      );

      if (existingUser) {
        return HttpResponse.json(
          { message: 'User already exists', type: AUTH_METHODS.phone },
          { status: 409 },
        );
      }

      const { accessToken, id } = createAccessToken();

      const user: MockUserPhone = {
        id,
        countryCode,
        phone,
        password,
        role,
      };
      mockUsers.set(id, user);

      return HttpResponse.json({
        accessToken,
        user: userResponse(user),
      });
    }

    if (isMethodEmail) {
      const { email, password, role } = body;

      if (!email || !password) {
        return HttpResponse.json(
          { message: 'Invalid email or password', type: AUTH_METHODS.email },
          { status: 400 },
        );
      }

      const existingUser = Array.from(mockUsers.values()).find(
        (u): u is MockUserEmail =>
          AUTH_METHODS.email in u &&
          u.email === email &&
          u.password === password,
      );

      if (existingUser) {
        return HttpResponse.json(
          { message: 'User already exists', type: AUTH_METHODS.email },
          { status: 409 },
        );
      }

      const { accessToken, id } = createAccessToken();

      const user: MockUserEmail = {
        id,
        email,
        password,
        role,
      };
      mockUsers.set(id, user);

      return HttpResponse.json({
        accessToken,
        user: userResponse(user),
      });
    }

    // Fallback if neither email nor phone method was detected
    return HttpResponse.json(
      {
        message:
          'Invalid registration payload. Must contain email or (countryCode + phone).',
      },
      { status: 400 },
    );
  }),

  http.post(`${BASE}/login`, async ({ request }) => {
    const body = (await request.json()) as RequestUser;

    const isMethodEmail = AUTH_METHODS.email in body;
    const isMethodPhone = AUTH_METHODS.phone in body;

    if (isMethodEmail) {
      const { email, password, role } = body;

      const user = Array.from(mockUsers.values()).find(
        (u): u is MockUserEmail =>
          AUTH_METHODS.email in u &&
          u.email === email &&
          u.password === password,
      );

      if (!user) {
        return HttpResponse.json(
          { message: 'Invalid email or password', type: 'email' },
          { status: 401 },
        );
      }

      if (role !== undefined && isMockUserRole(role)) {
        if (role !== user.role) {
          return HttpResponse.json(
            { message: 'Роль не совпадает с аккаунтом', type: 'email' },
            { status: 403 },
          );
        }
      }
      const { accessToken } = createTokenPair(user.id);

      return HttpResponse.json({
        accessToken,
        user: userResponse(user),
      });
    }

    if (isMethodPhone) {
      const { countryCode, password, phone, role } = body;

      const user = Array.from(mockUsers.values()).find(
        (u): u is MockUserPhone =>
          AUTH_METHODS.phone in u &&
          u.countryCode === countryCode &&
          u.phone === phone &&
          u.password === password,
      );

      if (!user) {
        return HttpResponse.json(
          { message: 'Invalid phone number or password', type: 'phone' },
          { status: 401 },
        );
      }

      if (role !== undefined && isMockUserRole(role)) {
        if (role !== user.role) {
          return HttpResponse.json(
            { message: 'Роль не совпадает с аккаунтом' },
            { status: 403 },
          );
        }
      }
      const { accessToken } = createTokenPair(user.id);

      return HttpResponse.json({
        accessToken,
        user: userResponse(user),
      });
    }
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
      user: userResponse(user),
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
      user: userResponse(user),
    });
  }),
];

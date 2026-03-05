'use client';

import { useState } from 'react';

import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from '@/features/session';

import {
  selectAccessToken,
  selectIsAuthenticated,
  selectStatus,
  useAuthMeQuery,
  useAuthStore,
} from '@/entities/session';
import { selectUser, useUserStore } from '@/entities/user';

import { ApiError } from '@/shared/api/api-error';
import type { AuthErrorResponse } from '@/shared/api/contracts/auth';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export default function AuthTestPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [logs, setLogs] = useState<string[]>([]);

  const status = useAuthStore(selectStatus);
  const accessToken = useAuthStore(selectAccessToken);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useUserStore(selectUser);
  const authActions = useAuthStore((s) => s.actions);

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();
  const { refetch: refetchMe, isFetching: isRefetchingMe } = useAuthMeQuery();

  function log(message: string) {
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${message}`,
      ...prev,
    ]);
  }

  function formatApiError(err: unknown, prefix: string): string {
    if (err instanceof ApiError) {
      const msg = (err.data as AuthErrorResponse | undefined)?.message;
      return `${prefix}: ${err.status}${msg ? ` - ${msg}` : ''}`;
    }
    return `${prefix}: ${String(err)}`;
  }

  function handleRegister() {
    log('POST /auth/register ...');
    registerMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          log(
            `Register OK. User: ${data.user.email}, Token: ${data.accessToken.slice(0, 20)}...`,
          );
        },
        onError: (err) => {
          log(formatApiError(err, 'Register FAILED'));
        },
      },
    );
  }

  function handleLogin() {
    log('POST /auth/login ...');
    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          log(
            `Login OK. User: ${data.user.email}, Token: ${data.accessToken.slice(0, 20)}...`,
          );
        },
        onError: (err) => {
          log(formatApiError(err, 'Login FAILED'));
        },
      },
    );
  }

  async function handleGetMe() {
    log('GET /auth/me ...');
    try {
      const result = await refetchMe();
      if (result.data) {
        log(
          `Me OK. User: ${result.data.user.email}, Role: ${result.data.user.role}`,
        );
      }
    } catch (err) {
      log(formatApiError(err, 'Me FAILED'));
    }
  }

  function handleLogout() {
    log('POST /auth/logout ...');
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        log('Logout OK');
      },
      onError: (err) => {
        log(formatApiError(err, 'Logout FAILED'));
      },
    });
  }

  function handleClearToken() {
    authActions.setAccessToken(undefined);
    log(
      'Access token cleared from store (simulating page reload / token expiry)',
    );
  }

  return (
    <div className='flex min-h-screen items-start justify-center bg-zinc-50 p-8 dark:bg-zinc-950'>
      <div className='flex w-full max-w-4xl gap-6'>
        <div className='flex w-80 flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Auth Test</CardTitle>
              <CardDescription>
                Register, login, then test /me and refresh flow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='flex flex-col gap-2 pt-2'>
                  <Button
                    onClick={handleRegister}
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? 'Registering...' : 'Register'}
                  </Button>
                  <Button
                    onClick={handleLogin}
                    variant='secondary'
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Button
                  onClick={handleGetMe}
                  variant='outline'
                  disabled={isRefetchingMe}
                >
                  {isRefetchingMe ? 'Loading...' : 'GET /auth/me'}
                </Button>
                <Button onClick={handleClearToken} variant='outline'>
                  Clear Access Token
                </Button>
                <Button
                  onClick={handleLogout}
                  variant='destructive'
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-1.5 text-sm'>
                <div>
                  <span className='text-muted-foreground'>Status:</span>{' '}
                  <span className='font-mono font-medium'>{status}</span>
                </div>
                <div>
                  <span className='text-muted-foreground'>Authenticated:</span>{' '}
                  <span className='font-mono font-medium'>
                    {String(isAuthenticated)}
                  </span>
                </div>
                <div>
                  <span className='text-muted-foreground'>Token:</span>{' '}
                  <span className='font-mono text-xs break-all'>
                    {accessToken ? `${accessToken.slice(0, 30)}...` : 'none'}
                  </span>
                </div>
                <div>
                  <span className='text-muted-foreground'>User:</span>{' '}
                  <span className='font-mono text-xs'>
                    {user ? `${user.email} (${user.role})` : 'none'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='min-h-96 flex-1'>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
            <CardDescription>
              {
                'Request/response log. Test flow: Register > Clear Token > GET /me (triggers 401 > refresh > retry)'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-1 font-mono text-xs'>
              {logs.length === 0 && (
                <p className='text-muted-foreground'>No logs yet</p>
              )}
              {logs.map((line, i) => (
                <div
                  key={i}
                  className='border-border/50 border-b py-1 last:border-0'
                >
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

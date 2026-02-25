'use client';

import { useState } from 'react';

import {
  selectAccessToken,
  selectIsAuthenticated,
  selectStatus,
  useAuthStore,
} from '@/features/auth';

import { selectUser, useUserStore } from '@/entities/user';

import { $api } from '@/shared/api/api';
import { ApiError } from '@/shared/api/api-error';
import type {
  AuthErrorResponse,
  LoginResponse,
  MeResponse,
  RegisterResponse,
} from '@/shared/api/contracts/auth';
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
  const userActions = useUserStore((s) => s.actions);

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

  async function handleRegister() {
    try {
      log('POST /auth/register ...');
      const { data } = await $api.post<RegisterResponse>('/auth/register', {
        email,
        password,
      });
      authActions.setAccessToken(data.accessToken);
      authActions.setStatus('authenticated');
      userActions.setUser(data.user);

      log(
        `Register OK. User: ${data.user.email}, Token: ${data.accessToken.slice(0, 20)}...`,
      );
    } catch (err) {
      log(formatApiError(err, 'Register FAILED'));
    }
  }

  async function handleLogin() {
    try {
      log('POST /auth/login ...');
      const { data } = await $api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      authActions.setAccessToken(data.accessToken);

      authActions.setStatus('authenticated');

      userActions.setUser(data.user);

      log(
        `Login OK. User: ${data.user.email}, Token: ${data.accessToken.slice(0, 20)}...`,
      );
    } catch (err) {
      log(formatApiError(err, 'Login FAILED'));
    }
  }

  async function handleGetMe() {
    try {
      log('GET /auth/me ...');

      const { data } = await $api.get<MeResponse>('/auth/me');

      userActions.setUser(data.user);

      log(`Me OK. User: ${data.user.email}, Role: ${data.user.role}`);
    } catch (err) {
      log(`Me FAILED: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async function handleLogout() {
    try {
      log('POST /auth/logout ...');

      await $api.post('/auth/logout');

      authActions.logout();

      log('Logout OK');
    } catch (err) {
      log(formatApiError(err, 'Logout FAILED'));
    }
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
                  <Button onClick={handleRegister}>Register</Button>
                  <Button onClick={handleLogin} variant='secondary'>
                    Login
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
                <Button onClick={handleGetMe} variant='outline'>
                  GET /auth/me
                </Button>
                <Button onClick={handleClearToken} variant='outline'>
                  Clear Access Token
                </Button>
                <Button onClick={handleLogout} variant='destructive'>
                  Logout
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

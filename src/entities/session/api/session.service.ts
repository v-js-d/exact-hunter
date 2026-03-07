import { mutation, query, RequestType } from '@/shared/api/api';
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/shared/api/contracts/auth';

export const getMe = query<null, MeResponse>();

export const loginFn = mutation<LoginRequest, LoginResponse>(RequestType.Post);

export const registerFn = mutation<RegisterRequest, RegisterResponse>(
  RequestType.Post,
);

export const logoutFn = mutation<null, { message?: string }>(RequestType.Post);

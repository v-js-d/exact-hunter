import { LoginRequest, LoginResponse } from '../types/LoginDto';
import { RegisterRequest, RegisterResponse } from '../types/RegDto';

import { mutation } from '@/shared/api/api';

export const loginFn = mutation<LoginRequest, LoginResponse>();

export const registerFn = mutation<RegisterRequest, RegisterResponse>();

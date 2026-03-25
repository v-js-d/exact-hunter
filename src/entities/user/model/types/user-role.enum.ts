import z from 'zod';

import { UserRole } from './user-role.types';

const userRoles = Object.values(UserRole) as UserRole[];

export const userRoleEnum = z.enum(userRoles);

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AuthCard } from './AuthCard';

import { AuthMode } from '@/features/auth';

import { UserRole } from '@/entities/user';

const meta: Meta<typeof AuthCard> = {
  title: 'Auth/AuthCard',
  component: AuthCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof AuthCard>;

export const LoginMode: Story = {
  args: {
    role: 'CANDIDATE' as UserRole,
    mode: 'login' as AuthMode,
  },
  name: 'Login mode',
};

export const RegisterCandidate: Story = {
  args: {
    role: 'CANDIDATE' as UserRole,
    mode: 'register' as AuthMode,
  },
  name: 'Register Mode - Candidate',
};

export const RegisterEmployer: Story = {
  args: {
    role: 'EMPLOYER' as UserRole,
    mode: 'register' as AuthMode,
  },
  name: 'Register Mode - Employer',
};

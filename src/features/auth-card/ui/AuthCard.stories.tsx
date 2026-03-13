import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AuthCard } from './AuthCard';

import { AuthMode, UserRole } from '@/shared/api/contracts';

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

export const RegisterRecruiter: Story = {
  args: {
    role: 'RECRUITER' as UserRole,
    mode: 'register' as AuthMode,
  },
  name: 'Register Mode - Recruiter',
};

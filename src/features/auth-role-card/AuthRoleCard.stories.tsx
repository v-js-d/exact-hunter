import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AuthRoleCard } from './AuthRoleCard';

import { UserRole } from '@/shared/api/contracts';

const meta: Meta<typeof AuthRoleCard> = {
  title: 'Features/Auth/AuthRoleCard',
  component: AuthRoleCard,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthRoleCard>;

export const Candidate: Story = {
  args: {
    role: 'CANDIDATE' as UserRole,
  },
};

export const Employer: Story = {
  args: {
    role: 'RECRUITER' as UserRole,
  },
};

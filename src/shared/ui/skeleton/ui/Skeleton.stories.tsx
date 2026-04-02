import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className='h-6 w-50' />,
};

export const TextLines: Story = {
  render: () => (
    <div className='w-75 space-y-2'>
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-[90%]' />
      <Skeleton className='h-4 w-[70%]' />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => <Skeleton className='h-12 w-12 rounded-full' />,
};

export const CardLoading: Story = {
  render: () => (
    <div className='w-80 space-y-4 rounded-xl border p-6'>
      <Skeleton className='h-6 w-[40%]' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-[80%]' />
      <Skeleton className='h-32 w-full rounded-lg' />
    </div>
  ),
};

export const TableRow: Story = {
  render: () => (
    <div className='w-125 space-y-3'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='flex items-center gap-4'>
          <Skeleton className='h-10 w-10 rounded-md' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-30' />
        </div>
      ))}
    </div>
  ),
};

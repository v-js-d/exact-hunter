import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Основной пример
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

// Все варианты сразу
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Badge variant='default'>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='ghost'>Ghost</Badge>
      <Badge variant='link'>Link</Badge>
    </div>
  ),
};

// Пример использования как ссылки
export const AsLink: Story = {
  args: {
    variant: 'outline',
    asChild: true,
    children: <a href='https://google.com'>Clickable Badge</a>,
  },
};

// Пример с иконкой
export const WithIcon: Story = {
  render: () => (
    <Badge className='gap-1.5'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
        <path d='m9 12 2 2 4-4' />
      </svg>
      Verified
    </Badge>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Базовый пример
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    variant: 'default',
    size: 'default',
  },
};

// Все варианты оформления
export const Variants: Story = {
  render: () => (
    <div className='flex w-72 flex-col gap-4'>
      <Input variant='default' placeholder='Default variant' />
      <Input variant='secondary' placeholder='Secondary variant' />
      <Input variant='destructive' placeholder='Destructive (Error)' />
    </div>
  ),
};

// Размеры
export const Sizes: Story = {
  render: () => (
    <div className='flex w-72 flex-col gap-4'>
      <Input size='sm' placeholder='Small input (sm)' />
      <Input size='default' placeholder='Default input' />
    </div>
  ),
};

// Состояние ошибки (используем aria-invalid)
export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Поле с ошибкой',
  },
};

// Заблокированный
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Этот текст нельзя редактировать',
  },
};

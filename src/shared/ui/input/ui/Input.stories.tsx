import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'file'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    type: 'text',
    placeholder: 'Invalid input',
    'aria-invalid': true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const File: Story = {
  args: {
    type: 'file',
  },
};

export const WithValue: Story = {
  args: {
    type: 'text',
    defaultValue: 'Hello world',
  },
};

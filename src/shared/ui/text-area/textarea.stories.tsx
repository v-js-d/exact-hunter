import { Textarea } from './textarea';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid textarea',
    'aria-invalid': true,
  },
};

export const LargeContent: Story = {
  args: {
    defaultValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam.`,
  },
};

export const Playground: Story = {
  args: {
    placeholder: 'Playground textarea...',
    rows: 4,
  },
};

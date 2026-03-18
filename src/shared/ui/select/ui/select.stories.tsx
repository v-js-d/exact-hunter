import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <option value='apple'>Apple</option>
        <option value='banana'>Banana</option>
        <option value='orange'>Orange</option>
      </>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    children: (
      <>
        <option value=''>Select fruit</option>
        <option value='apple'>Apple</option>
        <option value='banana'>Banana</option>
        <option value='orange'>Orange</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    className: 'bg-gray-100 text-blue-600',
  },
};

export const ManyOptions: Story = {
  args: {
    children: (
      <>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
        <option>Option 5</option>
      </>
    ),
  },
};

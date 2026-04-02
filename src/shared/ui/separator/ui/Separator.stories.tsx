import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => (
    <div style={{ width: '300px', padding: '20px', background: '#f5f5f5' }}>
      <p>Above the line</p>
      <Separator {...args} />
      <p>Below the line</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    decorative: true,
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        height: '100px',
        padding: '20px',
        background: '#f5f5f5',
      }}
    >
      <p>Left side</p>
      <Separator {...args} />
      <p>Right side</p>
    </div>
  ),
};

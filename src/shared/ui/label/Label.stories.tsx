import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '../input';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className='grid w-70 gap-2'>
      <Label htmlFor='email'>Email</Label>
      <Input id='email' placeholder='Enter your email' />
    </div>
  ),
};

export const DisabledWithInput: Story = {
  render: () => (
    <div className='grid w-70 gap-2'>
      <Label htmlFor='disabled-input'>Disabled field</Label>
      <Input id='disabled-input' disabled placeholder='Disabled input' />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className='grid w-70 gap-2'>
      <Label htmlFor='required'>
        Email
        <span className='text-destructive'>*</span>
      </Label>
      <Input id='required' placeholder='Required field' />
    </div>
  ),
};

export const LongText: Story = {
  args: {
    children:
      'Very long label text that demonstrates wrapping behavior inside layouts',
  },
};

import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from '../../input';

import { FormField } from './formField';

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    htmlFor: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email-input',
  },
  render: (args) => (
    <FormField {...args} className='mx-auto grid max-w-100 gap-y-2'>
      <Input
        id={args.htmlFor}
        type='email'
        placeholder='Enter your email'
        className='w-full rounded border p-2'
      />
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email-input',
    error: 'Email is required',
  },
  render: (args) => (
    <FormField {...args} className='mx-auto grid max-w-100 gap-y-2'>
      <Input
        id={args.htmlFor}
        type='email'
        placeholder='Enter your email'
        className='w-full rounded border p-2'
      />
    </FormField>
  ),
};

export const CustomChildren: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username-input',
  },
  render: (args) => (
    <FormField {...args} className='mx-auto grid max-w-100 gap-y-2'>
      <div className='flex gap-2'>
        <Input
          id={args.htmlFor}
          type='text'
          placeholder='First Name'
          className='w-1/2 rounded border p-2'
        />
        <Input
          type='text'
          placeholder='Last Name'
          className='w-1/2 rounded border p-2'
        />
      </div>
    </FormField>
  ),
};

export const LabelHidden: Story = {
  args: {
    label: 'For a11y',
    htmlFor: 'username-input',
    labelHidden: true,
  },
  render: (args) => (
    <FormField {...args} className='mx-auto grid max-w-100 gap-y-2'>
      <div className='flex gap-2'>
        <Input
          id={args.htmlFor}
          type='text'
          placeholder='First Name'
          className='w-1/2 rounded border p-2'
        />
        <Input
          type='text'
          placeholder='Last Name'
          className='w-1/2 rounded border p-2'
        />
      </div>
    </FormField>
  ),
};

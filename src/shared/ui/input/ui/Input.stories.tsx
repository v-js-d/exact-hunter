import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input, SearchInput } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'secondary', 'transparent'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'circle'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    variant: 'default',
    size: 'default',
  },
};

export const Search: StoryObj<typeof SearchInput> = {
  render: (args) => (
    <div className='w-96'>
      <SearchInput
        {...args}
        placeholder='Поиск вакансий...'
        id='search-example'
      />
    </div>
  ),
};

export const SearchVariants: StoryObj<typeof SearchInput> = {
  render: () => (
    <div className='flex w-96 flex-col gap-6'>
      <div className='space-y-2'>
        <p className='text-sm text-gray-500'>Default Search</p>
        <SearchInput
          variant='default'
          placeholder='Найти компанию...'
          id='search-1'
        />
      </div>

      <div className='space-y-2'>
        <p className='text-sm text-gray-500'>Secondary Search</p>
        <SearchInput
          variant='secondary'
          placeholder='Найти город...'
          id='search-2'
        />
      </div>

      <div className='space-y-2'>
        <p className='text-sm text-gray-500'>Circle Search (Rounded)</p>
        <SearchInput
          size='circle'
          placeholder='Быстрый поиск...'
          id='search-3'
        />
      </div>
    </div>
  ),
};

export const TransparentInsideContainer: Story = {
  render: () => (
    <div className='ring-primary/30 flex w-80 items-center gap-2 rounded-xl border border-gray-300 p-2 transition-all focus-within:ring-2'>
      <span className='pl-2 text-gray-400'>🔍</span>
      <Input
        variant='transparent'
        placeholder='Transparent input...'
        className='h-auto'
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='flex w-72 flex-col gap-4'>
      <Input variant='default' placeholder='Default variant' />
      <Input variant='secondary' placeholder='Secondary variant' />
      <Input variant='destructive' placeholder='Destructive (Error)' />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex w-72 flex-col gap-4'>
      <Input size='sm' placeholder='Small input (sm)' />
      <Input size='default' placeholder='Default input' />
      <Input size='circle' placeholder='Circle input (rounded-3xl)' />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Поле с ошибкой',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Этот текст нельзя редактировать',
  },
};

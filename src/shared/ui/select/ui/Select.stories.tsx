import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select';
import { SelectRootProps } from './Select.types';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    onValueChange: { action: 'value changed' },
  },
  decorators: [
    (Story) => (
      <div className='flex min-h-75 items-center justify-center'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args: SelectRootProps) => (
    <Select {...args}>
      <SelectTrigger className='w-45'>
        <SelectValue placeholder='Выберите роль' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Роли</SelectLabel>
          <SelectItem value='candidate'>Кандидат</SelectItem>
          <SelectItem value='employer'>Работодатель</SelectItem>
          <SelectItem value='admin'>Админ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithScroll: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-50'>
        <SelectValue placeholder='Код страны' />
      </SelectTrigger>
      <SelectContent position='popper'>
        <SelectGroup>
          <SelectLabel>Популярные коды</SelectLabel>
          <SelectItem value='+7'>Россия (+7)</SelectItem>
          <SelectItem value='+375'>Беларусь (+375)</SelectItem>
          <SelectItem value='+998'>Узбекистан (+998)</SelectItem>
          <SelectSeparator />
          <SelectLabel>Остальные</SelectLabel>
          <SelectItem value='+374'>Армения (+374)</SelectItem>
          <SelectItem value='+995'>Грузия (+995)</SelectItem>
          <SelectItem value='+380'>Украина (+380)</SelectItem>
          <SelectItem value='+996'>Кыргызстан (+996)</SelectItem>
          <SelectItem value='+992'>Таджикистан (+992)</SelectItem>
          <SelectItem value='+44'>Великобритания (+44)</SelectItem>
          <SelectItem value='+1'>США (+1)</SelectItem>
          <SelectItem value='+49'>Германия (+49)</SelectItem>
          <SelectItem value='+33'>Франция (+33)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Select>
        <SelectTrigger size='sm' className='w-37.5'>
          <SelectValue placeholder='Small size' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='1'>Option 1</SelectItem>
          <SelectItem value='2'>Option 2</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size='default' className='w-37.5'>
          <SelectValue placeholder='Default size' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='1'>Option 1</SelectItem>
          <SelectItem value='2'>Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='border-destructive ring-destructive/20 w-45 ring-[3px]'>
        <SelectValue placeholder='Ошибка выбора' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>Исправьте данные</SelectItem>
        <SelectItem value='2'>Вариант 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className='w-45'>
        <SelectValue placeholder='Заблокировано' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>Ничего не выбрать</SelectItem>
      </SelectContent>
    </Select>
  ),
};

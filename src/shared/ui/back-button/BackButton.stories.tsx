import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BackButton } from '@/shared/ui';

const meta: Meta<typeof BackButton> = {
  title: 'UI/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Что это.** Кнопка "назад" на базе \`Button\`: иконка-шеврон, всегда \`variant="ghost"\`, по умолчанию \`size="icon-xs"\`. Для \`size\` доступны только иконочные варианты: \`icon\`, \`icon-xs\`, \`icon-sm\`, \`icon-lg\`.

**Пропсы.** Наследует пропсы \`Button\`, кроме \`onClick\`, \`children\`, \`asChild\`, \`variant\` и текстовых размеров кнопки. Вместо \`onClick\` передаётся \`onBack\`. Иконка внутри фиксирована.

**Остальное** (\`disabled\`, \`className\`, атрибуты кнопки) можно переопределять. \`size\` - только иконочные значения (см. выше).

`.trim(),
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Базовый вид: `ghost` и `icon-xs`. Серый блок - только рамка превью.',
      },
    },
  },
  args: {
    onBack: () => {},
  },
  render: (args) => (
    <div className='border-border flex min-h-24 w-full max-w-md flex-col items-start gap-4 rounded-lg border p-4'>
      <BackButton {...args} />
      <p className='text-muted-foreground text-sm'>
        Нажатие вызывает <code className='bg-muted rounded px-1'>onBack</code>.
      </p>
    </div>
  ),
};

export const WithTitle: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Атрибут `title` - нативная подсказка при наведении (в т.ч. для мыши).',
      },
    },
  },
  args: {
    onBack: () => {},
    title: 'Вернуться назад',
  },
  render: (args) => (
    <div className='border-border flex min-h-24 w-full max-w-md flex-col items-start gap-4 rounded-lg border p-4'>
      <BackButton {...args} />
      <p className='text-muted-foreground text-sm'>
        Наведите курсор на кнопку, чтобы увидеть подсказку.
      </p>
    </div>
  ),
};

export const LargeIconSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Пример: `size="icon-lg"` - другой иконочный размер, вариант кнопки по-прежнему `ghost`.',
      },
    },
  },
  args: {
    onBack: () => {},
    size: 'icon-lg',
  },
  render: (args) => (
    <div className='border-border flex min-h-24 w-full max-w-md flex-col items-start gap-4 rounded-lg border p-4'>
      <BackButton {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Стандартный проп `disabled` с родительского `Button`.',
      },
    },
  },
  args: {
    onBack: () => {},
    disabled: true,
  },
  render: (args) => (
    <div className='border-border flex min-h-24 w-full max-w-md flex-col items-start gap-4 rounded-lg border p-4'>
      <BackButton {...args} />
    </div>
  ),
};

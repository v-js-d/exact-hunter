import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'UI/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Что это.** На широких экранах основной контент страницы часто не должен тянуться на всю ширину. \`Container\` задаёт верхнюю границу ширины (\`max-w-7xl\`) и выравнивает блок по центру (\`mx-auto\`).

**Как использовать.** Оборачиваете в \`Container\` то, что должно жить в одной колонке: секции, форму, список карточек и т.д. В \`children\` - обычная вёрстка.

**Отступы от краёв экрана** (чтобы текст не прилипал к краям на телефоне) добавляйте через \`className\`, например \`px-4\` или \`px-4 md:px-8\`. Сам компонент отступы не задаёт - только ширину и центрирование.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `Серый фон вокруг нужен только в Storybook: так видно границу "экрана". Белая карточка - это уже контент внутри \`Container\`. В приложении фон страницы вы задаёте сами (layout, секция); \`Container\` отвечает только за ширину колонки.`,
      },
    },
  },
  render: () => (
    <div className='bg-muted w-full py-10'>
      <Container>
        <div className='bg-background border-border rounded-lg border p-6 shadow-sm'>
          <p className='text-foreground text-sm'>
            Пример контента внутри контейнера.
          </p>
        </div>
      </Container>
    </div>
  ),
};

export const WithPadding: Story = {
  parameters: {
    docs: {
      description: {
        story: `Тот же сценарий, но к контейнеру добавлен \`className\` с горизонтальными отступами. Так контент не упирается в края вьюпорта на узких экранах. Конкретные классы (\`px-4 sm:px-6\`) - пример;`,
      },
    },
  },
  render: () => (
    <div className='bg-muted w-full py-10'>
      <Container className='px-4 sm:px-6'>
        <div className='bg-background border-border rounded-lg border p-6 shadow-sm'>
          <p className='text-foreground text-sm'>
            Контент с боковыми полями через{' '}
            <code className='font-mono text-xs'>className</code>.
          </p>
        </div>
      </Container>
    </div>
  ),
};

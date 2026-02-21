import { ExampleForm } from './ExampleForm';

import { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof ExampleForm> = {
  title: 'Shared/Form/ExampleForm',
  component: ExampleForm,
};

export default meta;
type Story = StoryObj<typeof ExampleForm>;

// Story по умолчанию
export const Default: Story = {};

export const Prefilled: Story = {
  render: () => <ExampleForm />,
};

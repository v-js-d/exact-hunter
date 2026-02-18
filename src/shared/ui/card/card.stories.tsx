import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className='w-95'>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt.
        </p>
      </CardContent>

      <CardFooter>
        <p className='text-muted-foreground text-sm'>Footer content</p>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className='w-95'>
      <CardHeader>
        <CardTitle>Card With Action</CardTitle>
        <CardDescription>Card header with action element</CardDescription>

        <CardAction>
          <button className='text-sm font-medium'>Action</button>
        </CardAction>
      </CardHeader>
    </Card>
  ),
};

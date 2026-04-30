import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { BadgeList } from './BadgeList';

const meta: Meta<typeof BadgeList> = {
  title: 'UI/BadgeList',
  component: BadgeList,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeList>;

const sampleTags = ['Frontend', 'Remote', 'Full-time'];

export const Default: Story = {
  args: {
    data: sampleTags,
    variant: 'default',
    size: 'sm',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <BadgeList data={sampleTags} variant='default' />
      <BadgeList data={sampleTags} variant='secondary' />
      <BadgeList data={sampleTags} variant='destructive' />
      <BadgeList data={sampleTags} variant='outline' />
      <BadgeList data={sampleTags} variant='ghost' />
      <BadgeList data={sampleTags} variant='link' />
    </div>
  ),
};

export const MediumSize: Story = {
  args: {
    data: sampleTags,
    variant: 'secondary',
    size: 'md',
  },
};

export const RemovableAndClickable: Story = {
  args: {
    data: sampleTags,
    variant: 'outline',
    removable: true,
    onTagClick: () => {},
    onRemove: () => {},
  },
};

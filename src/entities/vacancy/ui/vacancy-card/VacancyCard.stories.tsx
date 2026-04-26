import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Vacancy } from '../../model/types/vacancy.types';

import { VacancyCard } from './VacancyCard';

const meta: Meta<typeof VacancyCard> = {
  title: 'Entities/VacancyCard',
  component: VacancyCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VacancyCard>;

const mockVacancy: Vacancy = {
  id: '1',
  companyId: 'comp-1',
  company: {
    city: 'Mockow',
    id: 'company-o0938208324',
    location: 'Russia',
    name: 'Tech Innovators Corp',
    rating: 4.8,
    // добавь другие поля Company, если они обязательны
  },
  projectId: null,
  title: 'Senior Frontend Engineer',
  description: 'Full description of the vacancy...',
  position: 'Senior',
  salaryMin: 300000,
  salaryMax: 450000,
  currency: 'RUB',
  location: 'Remote, Serbia',
  workType: 'Удаленно',
  employmentType: 'Полная занятость',
  isActive: true,
  isPublic: true,
  expiresAt: '2026-12-31T23:59:59Z',
  viewsCount: 245,
  repliesCount: 12,
  createdAt: '2026-01-01T10:00:00Z',
  updatedAt: '2026-01-05T12:00:00Z',
  createdBy: 'admin',
  updatedBy: 'admin',
};

export const Default: Story = {
  args: {
    vacancy: mockVacancy,
  },
};

// 2. без откликов
export const New: Story = {
  args: {
    vacancy: {
      ...mockVacancy,
      repliesCount: 0,
    },
  },
};

// 4. Длинный заголовок (проверка верстки)
export const LongTitle: Story = {
  args: {
    vacancy: {
      ...mockVacancy,
      title:
        'Lead Fullstack Software Engineer and Team Leader with focus on Node.js and React Ecosystem',
    },
  },
};

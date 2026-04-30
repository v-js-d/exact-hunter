import Link from 'next/link';

import { AppRouter } from '@/shared/config/AppRouter';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Container } from '@/shared/ui/container';

const comingSoonFeatures = [
  {
    title: 'Лимит откликов без спама',
    description:
      'Не больше 10 откликов в сутки, чтобы каждый отклик оставался осмысленным и релевантным.',
  },
  {
    title: 'Персональные рекомендации',
    description: 'Подбор вакансий на основе навыков, опыта и предпочтений.',
  },
  {
    title: 'Несколько резюме под разные роли',
    description:
      'Храните и отправляйте разные версии резюме для frontend, backend, fullstack и других направлений.',
  },
  {
    title: 'История изменений резюме',
    description:
      'Сохраняем версии резюме и показываем, какие правки повысили просмотры и приглашения.',
  },
  {
    title: 'AI-помощник для резюме и вакансий',
    description:
      'ИИ помогает кандидатам усиливать резюме, а работодателям — формулировать более точные вакансии.',
  },
  {
    title: 'Аналитика и трекинг откликов',
    description:
      'Статусы, просмотры, приглашения и отказы в единой воронке для кандидатов и работодателей.',
  },
] as const;

const Home = () => (
  <section className='flex w-full flex-1 items-center py-6 sm:py-10'>
    <Container>
      <div className='flex w-full flex-col gap-8 sm:gap-10'>
        <Card className='rounded-4xl py-0 shadow-none'>
          <CardContent className='p-6 sm:p-10'>
            <div className='mb-4'>
              <Badge>Beta</Badge>
            </div>

            <h1 className='typo-h1 max-w-3xl'>
              Exact Hunter - Меньше откликов, больше офферов
            </h1>
            <p className='typo-body text-muted-foreground mt-4 max-w-2xl'>
              Мы строим сервис, который помогает кандидатам и компаниям находить
              точные совпадения по навыкам и ожиданиям. Полноценный запуск уже
              близко.
            </p>

            <div className='text-muted-foreground mt-5 inline-flex rounded-full border px-4 py-2 text-sm'>
              Сейчас работаем в beta-режиме: скоро откроем резюме, отклики и
              расширенный подбор.
            </div>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Button asChild>
                <Link href={AppRouter.vacancies}>Смотреть вакансии</Link>
              </Button>
              <Button asChild variant='outline'>
                <Link href={AppRouter.auth}>Войти / Регистрация</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {comingSoonFeatures.map((feature) => (
            <Card
              key={feature.title}
              className='hover:bg-accent/30 gap-0 rounded-3xl py-0 transition-colors'
            >
              <CardContent className='p-5'>
                <div className='mb-3'>
                  <Badge>Скоро</Badge>
                </div>
                <h2 className='typo-body font-semibold'>{feature.title}</h2>
                <p className='typo-body-sm text-muted-foreground mt-2'>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default Home;

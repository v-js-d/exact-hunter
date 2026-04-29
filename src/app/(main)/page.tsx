import Link from 'next/link';

import { AppRouter } from '@/shared/config/AppRouter';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

const comingSoonFeatures = [
  {
    title: 'Персональные рекомендации',
    description: 'Подбор вакансий на основе навыков, опыта и предпочтений.',
  },
  {
    title: 'Отклик в 1 клик',
    description: 'Готовый профиль и резюме для быстрых и точных откликов.',
  },
  {
    title: 'Трекинг откликов',
    description: 'Понятные статусы по всем откликам и ответы работодателей.',
  },
] as const;

const Home = () => (
  <section className='flex w-full flex-1 items-center py-6 sm:py-10'>
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-8 sm:gap-10'>
      <div className='bg-card rounded-4xl border p-6 sm:p-10'>
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
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {comingSoonFeatures.map((feature) => (
          <article
            key={feature.title}
            className='bg-card hover:bg-accent/30 rounded-3xl border p-5 transition-colors'
          >
            <div className='mb-3'>
              <Badge>Скоро</Badge>
            </div>
            <h2 className='typo-body font-semibold'>{feature.title}</h2>
            <p className='typo-body-sm text-muted-foreground mt-2'>
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Home;

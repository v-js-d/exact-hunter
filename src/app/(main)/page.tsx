import Link from 'next/link';

import { AppRouter } from '@/shared/config/AppRouter';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Container } from '@/shared/ui/container';

const comingSoonFeatures = [
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
    title: 'AI-помощник для резюме',
    description:
      'ИИ подскажет, как усилить описание опыта и адаптировать резюме под конкретную вакансию.',
  },
] as const;

const quickStats = [
  {
    value: '87%',
    label: 'Точных совпадений по навыкам',
  },
  {
    value: '10/день',
    label: 'Лимит осмысленных откликов',
  },
  {
    value: '3x',
    label: 'Быстрее подбор под роль',
  },
] as const;

const Home = () => (
  <section className='w-full rounded-2xl border border-zinc-200/60 bg-zinc-50/80 py-8 backdrop-blur-sm md:py-12 dark:border-zinc-800/80 dark:bg-zinc-950/80'>
    <Container>
      <div className='flex w-full flex-col gap-8 sm:gap-10'>
        <Card className='rounded-4xl border-white/40 bg-white/80 py-0 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-black/20'>
          <CardContent className='p-6 sm:p-10'>
            <div className='mb-5 flex flex-wrap items-center gap-2'>
              <Badge>Beta</Badge>
              <span className='text-muted-foreground rounded-full border border-white/60 bg-white/65 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5'>
                Запуск новых функций в ближайших релизах
              </span>
            </div>

            <h1 className='typo-h1 max-w-4xl text-balance sm:text-5xl'>
              Exact Hunter - Меньше откликов, больше офферов
            </h1>
            <p className='typo-body text-muted-foreground mt-5 max-w-2xl'>
              Мы строим сервис, помогает находить вакансии и резюме с упором на
              релевантность. Полноценный запуск уже близко.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Button asChild className='shadow-md'>
                <Link href={AppRouter.vacancies}>Смотреть вакансии</Link>
              </Button>
              <Button
                asChild
                variant='outline'
                className='bg-white/70 dark:bg-white/5'
              >
                <Link href={AppRouter.auth}>Войти / Регистрация</Link>
              </Button>
            </div>

            <div className='mt-8 grid gap-3 sm:grid-cols-3'>
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-xs dark:border-white/10 dark:bg-white/5'
                >
                  <p className='text-foreground text-xl font-semibold'>
                    {stat.value}
                  </p>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {comingSoonFeatures.map((feature) => (
            <Card
              key={feature.title}
              className='group gap-0 rounded-3xl border-white/60 bg-white/80 py-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5'
            >
              <CardContent className='p-5'>
                <div className='mb-3 flex items-center justify-between'>
                  <Badge>Скоро</Badge>
                </div>
                <h2 className='typo-body group-hover:text-blue-35 font-semibold transition-colors'>
                  {feature.title}
                </h2>
                <p className='typo-body-sm text-muted-foreground mt-2 leading-relaxed'>
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

'use client';

import { Eye, Users } from 'lucide-react';

import type { VacancySummaryCardProps } from './VacancySummaryCard.types';

import { ApplyToVacancyButton } from '@/features/vacancy-apply';

import { TextFallBack } from '@/shared/config/TextFallBack';
import { useDateTime } from '@/shared/lib';
import { DateFormats } from '@/shared/lib/utils/formatters/duration/time';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

export const VacancySummaryCard = ({ vacancy }: VacancySummaryCardProps) => {
  const dateTime = useDateTime();

  return (
    <aside>
      <Card className='py-0 lg:sticky lg:top-6'>
        <CardHeader className='border-b py-6'>
          <CardTitle>Сводка вакансии</CardTitle>
          <CardDescription>Ключевые параметры по позиции</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4 py-6'>
          <div className='space-y-1'>
            <p className='text-sm text-zinc-500'>Дедлайн отклика</p>
            <p className='font-medium'>
              {dateTime.getDate(vacancy.createdAt, DateFormats.DMY) ||
                TextFallBack.common.notSpecified}
            </p>
          </div>
          <Separator />
          <div className='grid grid-cols-2 gap-3'>
            <div className='rounded-lg border p-3'>
              <div className='mb-1 flex items-center gap-1 text-zinc-500'>
                <Eye className='size-4' />
                <span className='text-xs'>Просмотры</span>
              </div>
              <p className='text-lg font-semibold'>{vacancy.viewsCount ?? 0}</p>
            </div>
            <div className='rounded-lg border p-3'>
              <div className='mb-1 flex items-center gap-1 text-zinc-500'>
                <Users className='size-4' />
                <span className='text-xs'>Отклики</span>
              </div>
              <p className='text-lg font-semibold'>
                {vacancy.repliesCount ?? 0}
              </p>
            </div>
          </div>
          <Separator />
          <ApplyToVacancyButton
            vacancyId={vacancy.id}
            size='lg'
            className='w-full'
          />
        </CardContent>
      </Card>
    </aside>
  );
};

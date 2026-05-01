'use client';

import { useMemo } from 'react';

import {
  VacancyCompanySection,
  VacancyDescriptionSection,
  VacancyMainHeader,
  VacancySalarySection,
} from './components';
import type { VacancyMainContentProps } from './VacancyMainContent.types';

import { getVacancyTagLabels } from '@/entities/vacancy';

import { TextFallBack } from '@/shared/config/TextFallBack';
import { getCurrencyRange, useFormatDateTime } from '@/shared/lib';
import { DateFormats } from '@/shared/lib/utils/formatters/dateTime/date';
import { Card, CardContent } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

export const VacancyMainContent = ({ vacancy }: VacancyMainContentProps) => {
  const dateTime = useFormatDateTime();

  const tags = useMemo(
    () =>
      getVacancyTagLabels({
        position: vacancy.position,
        employmentType: vacancy.employmentType,
        workType: vacancy.workType,
      }),
    [vacancy.employmentType, vacancy.position, vacancy.workType],
  );

  const salary = getCurrencyRange({
    min: vacancy.salaryMin,
    max: vacancy.salaryMax,
    currency: vacancy.currency,
  });

  const vacancyCreatedDate =
    dateTime.getDate(vacancy.createdAt, DateFormats.DMY) ||
    TextFallBack.common.notSpecified;

  const companyLocation = [vacancy.company?.city, vacancy.company?.location]
    .filter(Boolean)
    .join(', ');

  const displayData = {
    title: vacancy.title || TextFallBack.vacancy.title,
    description: vacancy.description || TextFallBack.vacancy.description,
    companyName: vacancy.company?.name || TextFallBack.company.name,
    vacancyLocation: vacancy.location || TextFallBack.vacancy.location,
    companyLocation: companyLocation || TextFallBack.company.location,
    publishedAt: vacancyCreatedDate,
    companyRating: vacancy.company?.rating ?? 0,
  };

  return (
    <Card className='py-0'>
      <VacancyMainHeader
        tags={tags}
        title={displayData.title}
        companyName={displayData.companyName}
        vacancyLocation={displayData.vacancyLocation}
        companyLocation={displayData.companyLocation}
        publishedAt={displayData.publishedAt}
        companyRating={displayData.companyRating}
      />

      <CardContent className='space-y-8 py-6'>
        <VacancySalarySection salary={salary} />
        <Separator />
        <VacancyDescriptionSection description={displayData.description} />
        <Separator />
        <VacancyCompanySection
          companyName={displayData.companyName}
          companyLocation={displayData.companyLocation}
        />
      </CardContent>
    </Card>
  );
};

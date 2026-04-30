interface VacancyDescriptionSectionProps {
  description: string;
}

export const VacancyDescriptionSection = ({
  description,
}: VacancyDescriptionSectionProps) => (
  <section className='space-y-3'>
    <h2 className='text-lg font-semibold'>Описание</h2>
    <p className='leading-relaxed text-zinc-700 dark:text-zinc-300'>
      {description}
    </p>
  </section>
);

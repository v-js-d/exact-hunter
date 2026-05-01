interface VacancySalarySectionProps {
  salary: string;
}

export const VacancySalarySection = ({ salary }: VacancySalarySectionProps) => (
  <section className='space-y-3'>
    <h2 className='text-lg font-semibold'>Зарплата</h2>
    <p className='text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100'>
      {salary}
    </p>
  </section>
);

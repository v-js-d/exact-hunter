interface VacancyCompanySectionProps {
  companyName: string;
  companyLocation: string;
}

export const VacancyCompanySection = ({
  companyName,
  companyLocation,
}: VacancyCompanySectionProps) => (
  <section className='space-y-4'>
    <h2 className='text-lg font-semibold'>О компании</h2>
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
      <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
        <p className='text-sm text-zinc-500'>Компания</p>
        <p className='mt-1 font-medium'>{companyName}</p>
      </div>
      <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
        <p className='text-sm text-zinc-500'>Локация</p>
        <p className='mt-1 font-medium'>{companyLocation}</p>
      </div>
    </div>
  </section>
);

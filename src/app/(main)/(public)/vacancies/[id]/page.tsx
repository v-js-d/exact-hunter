import { VacancyDetail } from '@/features/vacancy-detail';

type VacancyPageProps = {
  params: Promise<{ id: string }>;
};

const VacancyPage = async ({ params }: VacancyPageProps) => {
  const { id } = await params;

  return (
    <section className='flex w-full flex-col'>
      <VacancyDetail vacancyId={id} />
    </section>
  );
};

export default VacancyPage;

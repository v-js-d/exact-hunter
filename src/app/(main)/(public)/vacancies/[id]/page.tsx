import { VacancyDetail } from '@/widgets/vacancy-detail';

type VacancyPageProps = {
  params: Promise<{ id: string }>;
};

const VacancyPage = async ({ params }: VacancyPageProps) => {
  const { id } = await params;

  return <VacancyDetail vacancyId={id} />;
};

export default VacancyPage;

import Link from 'next/link';

import { AppRouter } from '@/shared/config/AppRouter';

const Home = () => (
  <div className='flex items-start justify-start'>
    <Link href={AppRouter.vacancies} className='link-nav'>
      Вакасии
    </Link>
  </div>
);

export default Home;

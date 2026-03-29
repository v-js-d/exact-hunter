import Link from 'next/link';

export const AuthPolicy = () => (
  <p className='*:[a]:text-blue-35 text-center text-sm'>
    Продолжая, вы клянётесь <Link href={'/democracy'}>защищать демократию</Link>{' '}
    и <Link href={'/rules'}>правила сервиса</Link>
  </p>
);

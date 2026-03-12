import Link from 'next/link';

// Вынес в отдельный компонент что бы не ререндерилься

export function RegistrationPolicy() {
  return (
    <p className='*:[a]:text-blue-35 text-center text-sm'>
      Продолжая, вы клянётесь{' '}
      <Link href={'/demokratia'}>защищать демократию</Link> и{' '}
      <Link href={'/rules'}>правила сервиса</Link>
    </p>
  );
}

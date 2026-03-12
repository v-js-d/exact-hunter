import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <div className='flex min-h-screen w-full max-w-3xl items-center gap-x-6 bg-white px-16 py-32 sm:items-start dark:bg-black'>
        <Link href={'/auth'}>Auth</Link>
      </div>
    </main>
  );
}

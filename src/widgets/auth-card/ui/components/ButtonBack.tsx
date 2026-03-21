'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export function ButtonBack({ onBack }: { onBack?: () => void }) {
  const router = useRouter();
  return (
    <button
      type='button'
      aria-label='Back'
      title='Back'
      className='absolute top-0 left-0 rotate-180 cursor-pointer rounded-sm duration-200 hover:bg-gray-200'
      onClick={() => onBack?.() ?? router.back()}
    >
      <ChevronRight className='text-gray-6b' size={24} />
    </button>
  );
}

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export default function TestPage() {
  return (
    <div className='container mx-auto flex flex-col gap-y-2 py-4'>
      <Label>Test input</Label>
      <Input placeholder='Test placeholder' className='w-50' />
      <Button
        size={'default'}
        variant={'secondary'}
        type='submit'
        className='w-fit'
      >
        Aplly
      </Button>
    </div>
  );
}

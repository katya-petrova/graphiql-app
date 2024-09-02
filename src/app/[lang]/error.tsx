'use client';

import { Button } from '@/components/Button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-lg">Ooops... Something went wrong</h2>

      <Button onClick={() => reset()} variant="secondary" className="w-64">
        Try again
      </Button>
    </div>
  );
}

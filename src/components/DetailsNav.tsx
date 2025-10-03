import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DetailsNav({ title }: { title: string }) {
  const navigation = useNavigate();

  return (
    <div className="grid max-w-[59rem] auto-rows-max gap-4">
      <div className="flex items-center gap-4" onClick={() => navigation(-1)}>
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 text-xl font-semibold tracking-tight shrink-0 whitespace-nowrap sm:grow-0">
          {title}
        </h1>
      </div>
    </div>
  );
}

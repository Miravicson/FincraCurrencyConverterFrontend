import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

export function LoadingSpinner({ loading }: { loading: boolean }) {
  const loaderClassName = cn('h-4 w-4 hidden ml-2', {
    'block animate-spin': loading,
  });

  return <Loader className={loaderClassName} />;
}

import { DashboardNavlink } from './DashboardNavlink';
import { Smile } from 'lucide-react';
import { PROFILE } from '@/routes/route-paths';
import { cn } from '@/lib/utils';

type Props = { isMobile?: boolean };
export function DashboardBottomNavlinks({ isMobile }: Props) {
  const className = cn('mt-auto', {
    'text-lg font-medium': isMobile,
    'pt-4': !isMobile,
  });

  return (
    <div className={className}>
      <DashboardNavlink
        link={PROFILE}
        text="Profile"
        preComponent={Smile}
        isMobile={isMobile}
      />
    </div>
  );
}

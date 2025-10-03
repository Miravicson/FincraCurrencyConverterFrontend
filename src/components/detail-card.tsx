import { cn } from '@/lib/utils';
import {
  Baby,
  Users as Parent,
  Hospital,
  ClipboardList as Appointment,
} from 'lucide-react';

export const DetailCardIcons = {
  child: Baby,
  parent: Parent,
  appointment: Appointment,
  hospital: Hospital,
} as const;

export type DetailCardProps = {
  icon: keyof typeof DetailCardIcons;
  title: string;
  className?: string;
  children: React.ReactElement;
  actionRight?: React.ReactElement;
};

export function DetailCard({
  title,
  icon = 'child',
  className,
  children,
  actionRight,
}: DetailCardProps) {
  const DetailIcon = DetailCardIcons[icon];

  return (
    <div className={cn('p-6 border border-[#E2E8F0] rounded-[8px]', className)}>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <div className="flex items-center justify-center bg-[#F0F2F3] rounded-[8px] w-10 h-10">
            {<DetailIcon className="size-4" />}
          </div>
          <div>{title}</div>
        </div>
        {actionRight ? actionRight : <div></div>}
      </div>
      {children}
    </div>
  );
}

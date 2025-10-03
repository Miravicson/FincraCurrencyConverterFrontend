import { cn } from '@/lib/utils';
import { LayoutDashboard, LucideIcon } from 'lucide-react';
import { DashboardNavlink } from './DashboardNavlink';
import { ACCOUNTS, DASHBOARD, TRANSACTIONS } from '@/routes/route-paths';

import { useIsAdmin } from '@/lib/auth-provider-hooks.ts';

export type DashboardNavConfigType = {
  link: string;
  text: string;
  preElement?: React.JSX.Element;
  postElement?: React.JSX.Element;
  preComponent?: LucideIcon;
  postComponent?: React.ComponentType<{ className: string }>;
  className?: string;
  isMobile?: boolean;
};
type DashboardNavbarProps = { isMobile?: boolean };

export function DashboardNavbar({ isMobile }: DashboardNavbarProps) {
  const isSuperAdmin = useIsAdmin();

  const dashboardLinks: DashboardNavConfigType[] = [
    {
      link: DASHBOARD,
      text: 'Home',
      preComponent: LayoutDashboard,
    },
    {
      link: ACCOUNTS,
      text: 'Accounts',
      preComponent: LayoutDashboard,
    },
    {
      link: TRANSACTIONS,
      text: 'Transactions',
      preComponent: LayoutDashboard,
    },
  ];

  const adminLinks: DashboardNavConfigType[] = [];

  const completeLinks = isSuperAdmin
    ? dashboardLinks.concat(adminLinks)
    : dashboardLinks;
  const className = cn({
    'grid items-start px-2 text-sm font-medium lg:px-4': !isMobile,
    'grid gap-2 text-lg font-medium': isMobile,
  });

  return (
    <nav className={className}>
      {completeLinks.map((props) => (
        <DashboardNavlink {...props} isMobile={isMobile} key={props.link} />
      ))}
    </nav>
  );
}

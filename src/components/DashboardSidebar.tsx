import { Bell, Smile } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { PROFILE, HOME } from '@/routes/route-paths';
import { DashboardNavlink } from './DashboardNavlink';
import { DashboardNavbar } from './DashboardNavbar';
import { FincraLogo } from './fincra-logo';

export function DashboardSidebar() {
  return (
    <div className="flex flex-col h-full max-h-screen gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to={HOME} className="flex items-center gap-2 font-semibold">
          <FincraLogo className=" h-8" />
        </NavLink>
        <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
          <Bell className="w-4 h-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="flex-1">
        <DashboardNavbar />
      </div>
      <div className="p-4 mt-auto">
        <DashboardNavlink
          link={PROFILE}
          text="Profile"
          preElement={<Smile className="w-4 h-4" />}
          className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
        />
      </div>
    </div>
  );
}

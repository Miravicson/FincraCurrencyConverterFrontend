import { Menu, LogInIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN, DASHBOARD, HOME, SIGNUP } from '@/routes/route-paths';
import { ProfileDropdown } from './ProfileDropdown';
import { DashboardNavbar } from './DashboardNavbar';
import { DashboardBottomNavlinks } from './DashboardBottomNavlinks';
import { Condition } from './Condition';
import { DashboardNavlink } from './DashboardNavlink';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-provider-hooks.ts';
import { StopImpersonation } from './stop-impersonation';
import { FincraLogo } from './fincra-logo';

export function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const isInDashboard = location.pathname.startsWith(DASHBOARD);
  const isAtLogin = location.pathname.startsWith(LOGIN);
  const isAuthenticated = !!user;

  const headerClassName = cn({
    'top-0 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6':
      !isInDashboard,
    'flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6':
      isInDashboard,
  });

  return (
    <header className={headerClassName}>
      <Condition.When condition={!isInDashboard}>
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavLink
            to={HOME}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <FincraLogo className=" h-10" />
          </NavLink>
        </nav>
      </Condition.When>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <NavLink
            to={HOME}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <FincraLogo className="h-8" />
          </NavLink>
          <Condition.When condition={isAuthenticated}>
            <DashboardNavbar isMobile={true} />
            <DashboardBottomNavlinks isMobile={true} />
          </Condition.When>
          <Condition.When condition={!isAuthenticated}>
            <DashboardNavlink
              link={LOGIN}
              text="Login"
              preComponent={LogInIcon}
              isMobile
            />
            <DashboardNavlink
              link={SIGNUP}
              text="Signup"
              preComponent={LogInIcon}
              isMobile
            />
          </Condition.When>
        </SheetContent>
      </Sheet>

      <div className="flex-1 w-full"></div>

      <Condition.When condition={isAuthenticated}>
        <Condition.When condition={!isInDashboard}>
          <div className="ml-auto"></div>
          <DashboardNavlink
            link={DASHBOARD}
            text="Dashboard"
            className="hidden md:flex"
          />
        </Condition.When>
        <StopImpersonation />
        <ProfileDropdown />
      </Condition.When>

      <Condition.When condition={!isAuthenticated}>
        <Condition.When condition={!isInDashboard && !isAtLogin}>
          <div className="ml-auto"></div>
          <DashboardNavlink
            link={LOGIN}
            text="Login"
            className="hidden md:flex"
          />
          <DashboardNavlink
            link={SIGNUP}
            text="Signup"
            className="hidden md:flex"
          />
        </Condition.When>
      </Condition.When>
    </header>
  );
}

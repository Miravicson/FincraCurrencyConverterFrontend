import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Logout from './Logout';
import { UserAvatar } from './UserAvatar';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth-provider-hooks.ts';

export function ProfileDropdown() {
  const { user: authUser } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <span className="sr-only">Toggle user menu</span>
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{`${authUser?.profile?.firstName} ${authUser?.profile?.lastName}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />

        <Logout
          render={(onClick) => {
            return (
              <DropdownMenuItem onClick={onClick}>Logout</DropdownMenuItem>
            );
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

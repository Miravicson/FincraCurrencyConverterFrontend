import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-provider-hooks.ts';

export type UserAvatarProps = {
  avatarClassName?: string;
};

export function UserAvatar({ avatarClassName }: UserAvatarProps) {
  const { user: authUser } = useAuth();

  return (
    <Avatar className={cn(avatarClassName)}>
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback>{`${authUser?.profile?.firstName?.toUpperCase()[0]}${authUser?.profile?.lastName?.toLocaleUpperCase()[0]}`}</AvatarFallback>
    </Avatar>
  );
}

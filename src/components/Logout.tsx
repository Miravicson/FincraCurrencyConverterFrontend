import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-provider-hooks.ts';

interface Props {
  className?: string;
  render?: (_handleLogout: () => void) => React.ReactElement;
}

export default function Logout({ render, className }: Props) {
  const { logout } = useAuth();

  if (render) {
    return render(logout);
  } else {
    return (
      <button onClick={logout} className={cn('', className)}>
        Logout
      </button>
    );
  }
}

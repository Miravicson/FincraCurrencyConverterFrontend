import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN } from './route-paths';
import { useAuth } from '@/lib/auth-provider-hooks.ts';

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={LOGIN} />;
  }
  return <Outlet />;
}

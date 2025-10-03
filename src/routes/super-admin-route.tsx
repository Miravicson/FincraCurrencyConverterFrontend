import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN } from './route-paths';
import { useIsAdmin } from '@/lib/auth-provider-hooks.ts';

export default function SuperAdminRoute() {
  const isSuperAdmin = useIsAdmin();
  if (!isSuperAdmin) {
    return <Navigate to={LOGIN} />;
  }
  return <Outlet />;
}

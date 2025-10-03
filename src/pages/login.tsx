import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/lib/auth-provider-hooks';
import { Navigate } from 'react-router-dom';
import { DASHBOARD } from '../routes/route-paths';

export default function Login() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={DASHBOARD} />;
  }

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <LoginForm />
    </div>
  );
}

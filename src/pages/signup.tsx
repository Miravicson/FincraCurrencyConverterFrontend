import { useAuth } from '@/lib/auth-provider-hooks';
import { Navigate } from 'react-router-dom';
import { DASHBOARD } from '../routes/route-paths';
import { SignupForm } from '@/components/SignupForm';

export default function Login() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={DASHBOARD} />;
  }

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <SignupForm />
    </div>
  );
}

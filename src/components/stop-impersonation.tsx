import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth-provider-hooks';
import {
  getGetUserAbilitiesQueryKey,
  useStopImpersonation,
} from '@/_generated';
import { LocalStorage } from '@/lib/local-storage';
import { LoadingSpinner } from './Loader';
import { useToast } from '@/lib/toast-provider';
import { queryClient } from '@/lib/query-client';
import { DASHBOARD } from '@/routes/route-paths';

export function StopImpersonation() {
  const { user: authUser } = useAuth();
  const { mutate, isPending: loading } = useStopImpersonation({
    mutation: {
      onSuccess: (_data, _variables, _context) => {
        return Promise.all([
          queryClient.invalidateQueries({
            queryKey: getGetUserAbilitiesQueryKey(),
          }),
        ]);
      },
    },
  });
  const navigate = useNavigate();
  const { alertError, alertSuccess } = useToast();

  const handleStopImpersonation = () => {
    mutate(
      { data: {} },
      {
        onSuccess: (data, _variables, _context) => {
          LocalStorage.setAuthUser(data.data);
          alertSuccess('Stopped Impersonation');
          navigate(DASHBOARD, { replace: true });
        },
        onError(error, _variables, _context) {
          alertError(
            Array.isArray(error.message)
              ? error.message.join(', ')
              : error.message,
          );
        },
      },
    );
  };

  if (!authUser?.isImpersonated) {
    return null;
  }

  return (
    <Button
      variant={'outline'}
      className="text-sm"
      onClick={handleStopImpersonation}
    >
      Stop Impersonation
      <LoadingSpinner loading={loading} />
    </Button>
  );
}

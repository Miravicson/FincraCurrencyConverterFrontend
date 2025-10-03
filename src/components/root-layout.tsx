import { Outlet } from 'react-router-dom';

// import { Header } from './Header';
import { QueryClientProvider } from '@/lib/query-client';
import { AuthProvider } from '@/lib/auth-provider';
import { AbilityProvider } from '@/lib/ability-provider';
import { ToastProvider } from '@/lib/toast-provider';

export default function Root() {
  return (
    <QueryClientProvider>
      <ToastProvider>
        <AuthProvider>
          <AbilityProvider>
            {/*<Header />*/}

            <Outlet />
          </AbilityProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

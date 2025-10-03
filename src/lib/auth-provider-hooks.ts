import { createContext, useContext } from 'react';
import { UseAuthUserReturnType } from './auth-provider';
import { Role } from '@/_generated';

export const AuthContext = createContext<UseAuthUserReturnType | null>(null);

export function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      'useAuth has to be used within <AuthProvider></AuthProvider>',
    );
  }

  return authContext;
}

export function useIsAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === Role.Admin;
}

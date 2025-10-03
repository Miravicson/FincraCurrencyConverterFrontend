import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { AuthContext } from '@/lib/auth-provider-hooks.ts';
import { LocalStorage, useUserFromLocalStorage } from './local-storage';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getGetUserAbilitiesQueryKey,
  SignupDto,
  useGetProfile,
  useImpersonateUser,
  useLogin,
  useLogout,
  useSignup,
} from '@/_generated';
import { DASHBOARD, HOME, isPublicRoute } from '@/routes/route-paths';
import { LoginDto, UserEntity } from '@/_generated';
import { useToast } from './toast-provider';
import { queryClient } from './query-client';

type AuthProviderProps = {
  children: ReactNode;
};
export type UseAuthUserReturnType = {
  user: UserEntity | null;
  logout: () => void;
  login: (_data: LoginDto) => void;
  signup: (_data: SignupDto) => void;
  loading: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isImpersonating: boolean;
  isSigningUp: boolean;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUserFromLocalStorage();
  const {
    data: profile,
    refetch,
    isPending: isGettingProfile,
  } = useGetProfile({ query: { enabled: false } });
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();
  const { alertError, alertSuccess } = useToast();
  const { isPending: isLoggingIn, mutate: loginMutation } = useLogin();

  const { isPending: isSigningUp, mutate: signupMutation } = useSignup();
  const isPublic = isPublicRoute(pathname);

  const { mutate: impersonateMutation, isPending: isImpersonating } =
    useImpersonateUser({
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

  const impersonateStaff = useCallback(
    (user: UserEntity, callback?: () => void) => {
      if (user === null) {
        return;
      }
      impersonateMutation(
        { data: { impersonateUserId: user.id } },
        {
          onSuccess: (data, _variables, _context) => {
            LocalStorage.setAuthUser(data.data);
            alertSuccess('Impersonated successfully');
            if (callback) {
              callback();
            } else {
              navigate(DASHBOARD, { replace: true });
            }
          },
          onError: (error, _variables, _context) => {
            alertError(
              Array.isArray(error.message)
                ? error.message.join(', ')
                : error.message,
            );
          },
        },
      );
    },
    [alertError, alertSuccess, impersonateMutation, navigate],
  );

  const logout = useCallback(() => {
    logoutMutation(undefined, {
      onSuccess: () => {
        LocalStorage.removeAuthUser();
        navigate(HOME);
      },
      onError: () => {
        LocalStorage.removeAuthUser();
        navigate(HOME);
      },
    });
  }, [logoutMutation, navigate]);

  const login = useCallback(
    (data: LoginDto) => {
      loginMutation(
        { data },
        {
          onSuccess(data, _variables, _context) {
            LocalStorage.setAuthUser(data.data);
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
    },
    [alertError, loginMutation, navigate],
  );

  const signup = useCallback(
    (data: SignupDto) => {
      signupMutation(
        { data },
        {
          onSuccess(data, _variables, _context) {
            LocalStorage.setAuthUser(data.data);
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
    },
    [alertError, signupMutation, navigate],
  );

  const contextValue: UseAuthUserReturnType = useMemo(
    () => ({
      user,
      logout,
      login,
      signup,
      impersonateStaff,
      loading:
        isGettingProfile ||
        isLoggingIn ||
        isLoggingOut ||
        isImpersonating ||
        isSigningUp,
      isLoggingIn,
      isLoggingOut,
      isImpersonating,
      isSigningUp,
    }),
    [
      user,
      logout,
      login,
      signup,
      impersonateStaff,
      isGettingProfile,
      isLoggingIn,
      isLoggingOut,
      isImpersonating,
      isSigningUp,
    ],
  );

  useEffect(() => {
    if (!user && !isPublic) {
      refetch();
      if (profile) {
        LocalStorage.setAuthUser(profile.data);
      } else {
        logout();
      }
    }
  }, [profile, logout, refetch, user, isPublic]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

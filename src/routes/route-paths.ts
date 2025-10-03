/* eslint-disable @typescript-eslint/ban-types */
import path from 'path';
import { generatePath } from 'react-router-dom';

/**
 * Public routes
 */
export const HOME = '/';
export const SERVICE = path.join(HOME, 'service');
export const ABOUT = path.join(HOME, 'about');

/**
 * Authenticated only routes
 */

export const DASHBOARD = path.join(HOME, 'dashboard');
export const ACCOUNTS = path.join(DASHBOARD, 'accounts');
export const TRANSACTIONS = path.join(DASHBOARD, 'transactions');
export const CONVERT = path.join(DASHBOARD, 'convert');
export const FUND_ACCOUNT = path.join(DASHBOARD, 'fund-account');

export const LOGOUT = path.join(HOME, 'logout');
export const PROFILE = path.join(HOME, 'profile');

/**
 * Not Authenticated only routes
 */

export const RESET_PASSWORD = path.join(HOME, 'reset-password');
export const SIGNUP = path.join(HOME, 'signup');
export const LOGIN = path.join(HOME, 'login');
export const FORGOT_PASSWORD = path.join(HOME, 'forgot-password');

export const paths = {
  home: HOME,
  dashboard: DASHBOARD,
  accounts: ACCOUNTS,
  transactions: TRANSACTIONS,
  service: SERVICE,
  about: ABOUT,
  logout: LOGOUT,
  forgotPassword: FORGOT_PASSWORD,
  resetPassword: RESET_PASSWORD,
  profile: PROFILE,
  login: LOGIN,
  signup: SIGNUP,
} as const;

type Paths = typeof paths;

type RouteParams = {
  home: {};
  dashboard: {};
  accounts: {};
  transactions: {};
  service: {};
  about: {};
  logout: {};
  forgotPassword: {};
  resetPassword: {};
  profile: {};
  login: {};
  signup: {};
};

export function isPublicRoute(path: string): boolean {
  return [LOGIN, LOGOUT, FORGOT_PASSWORD, RESET_PASSWORD, SIGNUP].includes(
    path,
  );
}

export function generateTypedPath<T extends keyof Paths>(
  path: T,
  params?: RouteParams[T],
): string {
  return params
    ? generatePath(paths[path], params as any)
    : generatePath(paths[path]);
}

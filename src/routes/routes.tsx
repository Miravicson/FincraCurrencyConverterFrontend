import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { ErrorPage } from '@/error-page';

import {
  ACCOUNTS,
  CONVERT,
  DASHBOARD,
  FORGOT_PASSWORD,
  FUND_ACCOUNT,
  HOME,
  LOGIN,
  RESET_PASSWORD,
  SIGNUP,
  TRANSACTIONS,
} from './route-paths';
import { lazy, Suspense } from 'react';

const Root = lazy(() => import('@/components/root-layout.tsx'));
const HomePage = lazy(() => import('@/pages/home'));
const Dashboard = lazy(() => import('@/pages/dashboard/dashboard'));
const Convert = lazy(() => import('@/pages/dashboard/convert'));
const FundAccount = lazy(() => import('@/pages/dashboard/fund-account'));
const Accounts = lazy(() => import('@/pages/accounts/accounts'));
const Transactions = lazy(() => import('@/pages/transactions/transactions'));
const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const ForgotPassword = lazy(() => import('@/pages/forgot-password'));
const ResetPassword = lazy(() => import('@/pages/reset-password'));
const ProtectedRoute = lazy(() => import('@/routes/protected-route'));
const DashboardLayout = lazy(() => import('@/components/dashboard-layout.tsx'));
const HomePageLayout = lazy(() => import('@/components/home-page-layout.tsx'));

const dashboardRoutes = [
  {
    path: DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ACCOUNTS,
    element: <Accounts />,
  },
  {
    path: TRANSACTIONS,
    element: <Transactions />,
  },
];

const routes: RouteObject[] = [
  {
    path: HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          { element: <HomePage />, index: true },
          {
            element: <ProtectedRoute />,
            children: [
              {
                element: <Convert />,
                path: CONVERT,
              },
              {
                element: <FundAccount />,
                path: FUND_ACCOUNT,
              },
            ],
          },
        ],
        element: <HomePageLayout />,
      },
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: SIGNUP,
        element: <Signup />,
      },
      {
        path: FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: RESET_PASSWORD,
        element: <ResetPassword />,
      },
      {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            element: <DashboardLayout />,
            children: dashboardRoutes,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export function Routes() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

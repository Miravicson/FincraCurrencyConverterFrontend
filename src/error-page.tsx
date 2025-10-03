import { useRouteError, Link, Navigate } from 'react-router-dom';
import { DASHBOARD, LOGIN } from './routes/route-paths';
import { isAxiosError } from 'axios';

export function ErrorPage() {
  const error: Error = useRouteError() as Error;

  if (isAxiosError(error) && error.response?.status === 401) {
    return <Navigate to={LOGIN} replace />;
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="container flex flex-col-reverse items-center max-w-3xl gap-8 mx-auto md:flex-row md:gap-12">
        <div className="flex flex-col items-center justify-center flex-1 space-y-4 text-center md:items-start md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oo.ps! <br />
            An error occurred.
          </h1>
          <p className="max-w-[450px] text-gray-500 dark:text-gray-400">
            {error.message ??
              'Something went wrong and we are looking into it.'}
          </p>
          <Link
            to={DASHBOARD}
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium transition-colors bg-gray-900 rounded-md shadow text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            Go to dashboard
          </Link>
        </div>
        <div className="flex justify-center flex-1">
          <img
            src="/four-oh-four.gif"
            width={500}
            height={500}
            alt="404 Illustration"
            className="max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
            style={{ aspectRatio: '500/500', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}

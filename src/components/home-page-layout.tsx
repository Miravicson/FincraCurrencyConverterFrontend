import { Outlet } from 'react-router-dom';
import { Header } from './header.tsx';

export default function HomePageLayout() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="fixed top-0 z-10 left-0 right-0">
        <Header />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto pt-16 md:pt-[70px] lg:mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

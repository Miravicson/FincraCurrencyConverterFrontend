import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { Header } from './header.tsx';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="fixed top-0 z-10 left-0 right-0">
        <Header />
      </div>

      {/* Bottom Screen */}
      <div className={``}>
        {/* Sidebar */}
        <div className="hidden md:block fixed top-0 left-0 h-full w-[220px] lg:w-[280px] bg-muted border-r z-20">
          <DashboardSidebar />
        </div>

        {/* Main area */}
        <div className="flex flex-col flex-1 min-h-screen md:ml-[220px] lg:ml-[280px]">
          {/* Content */}
          <main className="flex-1 p-4 overflow-y-auto pt-16 md:pt-[70px] lg:mt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

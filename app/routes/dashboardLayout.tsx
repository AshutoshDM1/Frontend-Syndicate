import { Outlet, useLocation } from 'react-router';
import Sidebar from '~/pages/Dashboard/Sidebar';
import Dashboard from '~/pages/Dashboard/Dashboard';

const DashboardLayout = () => {

  const location = useLocation();
  const isAtParentRoute = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        <div className="flex flex-1 overflow-hidden">
          {/* <TubelightNavbar items={navItems} /> */}
          {/* Sidebar */}
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-muted/30 px-6 custom-scrollbar-main pb-20 lg:pb-6 pt-6">
            {isAtParentRoute ? (
              <Dashboard />
            ) : (
              <>
                <Outlet />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

import { Home, Settings, ShoppingCart, User } from 'lucide-react';
import { authClient, useSession } from '~/lib/auth-client';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Sidebar from '~/modules/Dashboard/Sidebar';
import Dashboard from '~/modules/Dashboard/Dashboard';
import { TubelightNavbar } from '~/components/ui/tubelight-navbar';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { signOut } = authClient;
  const { data: session } = useSession();

  const handleSignOut = () => {
    if (session === null) {
      navigate('/login'); // redirect to landing page
    } else {
      signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate('/login'); // redirect to login page
          },
        },
      });
    }
  };


  const navItems = [
    { name: 'Dashboard', url: '/dashboard/', icon: Home },
    { name: 'Users', url: '/dashboard/manage-user', icon: User },
    { name: 'Orders', url: '/dashboard/quick-order', icon: ShoppingCart },
    { name: 'Themes', url: '/dashboard', icon: Settings },
  ];

  const location = useLocation();
  const isAtParentRoute = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        <div className="flex flex-1 overflow-hidden">
        <TubelightNavbar items={navItems} />  
          {/* Sidebar */}
          <Sidebar />
          <div className="flex-1 overflow-auto p-6 bg-muted/30 custom-scrollbar-main pb-2 pt-14">
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

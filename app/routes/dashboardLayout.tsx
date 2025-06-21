import { Heading1, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { authClient, useSession } from '~/lib/auth-client';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Sidebar from '~/modules/Dashboard/Sidebar';
import Dashboard from '~/modules/Dashboard/Dashboard';

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

  const location = useLocation();
  const isAtParentRoute = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="w-full flex justify-between items-center bg-white border-b border-gray-200 py-4 px-8">
          <h1 className="text-xl font-bold">✨ Welcome to Restzo</h1>
          <div className="flex items-center gap-4">
            {session && <h1>{session?.user?.name}</h1>}
            {session?.user?.image && (
              <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <Button
              className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white cursor-pointer"
              variant="outline"
              onClick={handleSignOut}
            >
              {session ? (
                <>
                  <h1>Logout</h1>
                  <LogOut />
                </>
              ) : (
                <h1>Login</h1>
              )}
            </Button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
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

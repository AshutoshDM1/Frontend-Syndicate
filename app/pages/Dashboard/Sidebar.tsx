import {
  AppWindow,
  LayoutDashboard,
  ShoppingCart,
  TableIcon,
  UserIcon,
  Menu,
  LogOut,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import SidebarLink from '~/components/SidebarLink';
import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { authClient, useSession } from '~/lib/auth-client';

const Sidebar = () => {
  const { signOut } = authClient;
  const { data: session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = {
    Dashboard: {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      href: '/dashboard',
    },
    ManageUser: {
      icon: <UserIcon size={20} />,
      label: 'Manage User',
      href: '/dashboard/manage-user',
    },
    MonitorTables: {
      icon: <TableIcon size={20} />,
      label: 'Monitor Tables',
      href: '/dashboard/monitor-tables',
    },
    TableManagement: {
      icon: <TableIcon size={20} />,
      label: 'Table Management',
      href: '/dashboard/manage-table',
    },
    MenuCustom: {
      icon: <AppWindow size={20} />,
      label: 'Menu Customization',
      href: '/dashboard/menu-custom',
    },
    QuickOrder: {
      icon: <ShoppingCart size={20} />,
      label: 'Quick Order',
      href: '/dashboard/quick-order',
    },
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col justify-between w-64 bg-card border-r border-border p-4">
        <div>
          <div className="flex items-center gap-4 pb-4">
            <img src="/favicon.png" alt="logo" className="w-10 h-10" />
            <h1 className="text-lg font-semibold text-foreground ">Restzo</h1>
          </div>
          <nav className="space-y-3 flex flex-col gap-1 w-full">
            {Object.values(NavLink).map((link) => (
              <SidebarLink key={link.label} {...link} isActive={location.pathname === link.href} />
            ))}
          </nav>{' '}
        </div>
        <div className="flex flex-col gap-1 w-full">
          {session ? (
            <>
              <div className="flex items-center gap-4 pb-4">
                <img 
                  src={session?.user?.image || '/favicon.png'} 
                  alt={`${session?.user?.name || 'User'} avatar`} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/favicon.png';
                  }}
                />
                <h1 className="text-md font-medium text-foreground ">{session?.user?.name}</h1>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => {
                signOut()
                navigate('/login')
              }
              }>
                <LogOut size={20} />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 pb-4">
              <Button
                size="sm"
                className="bg-foreground/30 hover:bg-foreground/40 text-foreground w-full"
                onClick={() => navigate('/signup')}
              >
                <UserPlus size={20} />
                Signup
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground w-full"
                onClick={() => navigate('/login')}
              >
                <LogIn size={20} />
                Login
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg z-50">
          <div className="safe-area-pb">
            <nav className="flex justify-around items-center px-2 py-1">
              {Object.values(NavLink)
                .slice(0, 3)
                .map((link) => (
                  <SidebarLink
                    key={link.label}
                    {...link}
                    isActive={location.pathname === link.href}
                    isMobile={true}
                  />
                ))}
              {/* More Menu for additional items */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center gap-1 p-2 h-auto min-h-[60px] hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Menu size={20} />
                    <span className="text-xs">More</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[400px] bg-card/95 backdrop-blur-sm">
                  <div className="flex justify-between items-center border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground p-4 ">Navigation Menu</h2>
                  </div>
                  <nav className="space-y-3">
                    {Object.values(NavLink).map((link) => (
                      <div key={link.label} onClick={handleLinkClick}>
                        <SidebarLink {...link} isActive={location.pathname === link.href} />
                      </div>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

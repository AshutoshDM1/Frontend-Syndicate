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
import ThemeToggleButton from '~/components/ui/theme-toggle-button';
import { Role } from '~/types/user.types';

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
      allowedRoles: [
        Role.ADMIN,
        Role.MANAGER,
        Role.ORDER_MANAGER,
        Role.KITCHEN_MANAGER,
        Role.CUSTOMER,
      ],
    },
    ManageUser: {
      icon: <UserIcon size={20} />,
      label: 'Manage User',
      href: '/dashboard/manage-user',
      allowedRoles: [Role.ADMIN],
    },
    MonitorTables: {
      icon: <TableIcon size={20} />,
      label: 'Monitor Tables',
      href: '/dashboard/monitor-tables',
      allowedRoles: [Role.ADMIN, Role.MANAGER, Role.ORDER_MANAGER, Role.KITCHEN_MANAGER],
    },
    TableManagement: {
      icon: <TableIcon size={20} />,
      label: 'Table Management',
      href: '/dashboard/manage-table',
      allowedRoles: [Role.ADMIN, Role.MANAGER, Role.ORDER_MANAGER, Role.KITCHEN_MANAGER],
    },
    MenuCustom: {
      icon: <AppWindow size={20} />,
      label: 'Menu Customization',
      href: '/dashboard/menu-custom',
      allowedRoles: [Role.ADMIN, Role.MANAGER, Role.ORDER_MANAGER, Role.KITCHEN_MANAGER],
    },
    QuickOrder: {
      icon: <ShoppingCart size={20} />,
      label: 'Quick Order',
      href: '/dashboard/quick-order',
      allowedRoles: [
        Role.ADMIN,
        Role.MANAGER,
        Role.ORDER_MANAGER,
        Role.KITCHEN_MANAGER,
        Role.CUSTOMER,
      ],
    },
  };

  const userRole = (session as any)?.user?.role as Role | undefined;
  const allowedLinks = Object.values(NavLink).filter((link) =>
    userRole ? link.allowedRoles.includes(userRole) : false
  );

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
            {allowedLinks.map((link) => (
              <SidebarLink key={link.label} {...link} isActive={location.pathname === link.href} />
            ))}
          </nav>{' '}
        </div>
        <div className="flex flex-col gap-1 w-full">
          {session ? (
            <>
              <div className="flex items-center justify-between gap-4 pb-4">
                <h1 className="text-md font-medium text-foreground line-clamp-1 ml-3">
                  {session?.user?.name}
                </h1>
                <ThemeToggleButton variant="circle-blur" start="bottom-left" />
                <img
                  src={session?.user?.image || '/favicon.png'}
                  alt={`${session?.user?.name || 'User'} avatar`}
                  className="w-10 h-10 rounded-full object-cover hidden"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/favicon.png';
                  }}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center py-2 px-4 border gap-3 bg-primary text-primary-foreground dark:hover:bg-secondary/20 hover:bg-primary/80 rounded-md cursor-pointer"
                onClick={() => {
                  signOut();
                  navigate('/login');
                }}
              >
                <LogOut size={20} />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 pb-4">
              <Button
                size="sm"
                className="w-full flex items-center justify-center py-2 px-4 border gap-3 bg-primary text-primary-foreground dark:hover:bg-primary/20 hover:bg-primary/80 rounded-md cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                <UserPlus size={20} />
                Signup
              </Button>
              <Button
                size="sm"
                className="w-full flex items-center justify-center py-2 px-4 border gap-3 bg-secondary dark:hover:bg-foreground/20 hover:bg-foreground/80 rounded-md cursor-pointer"
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
              {allowedLinks.slice(0, 3).map((link) => (
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
                    {allowedLinks.map((link) => (
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

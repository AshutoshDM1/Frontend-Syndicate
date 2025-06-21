  import { LayoutDashboard, UserIcon } from "lucide-react";
import { useLocation } from "react-router";
import SidebarLink from "~/components/SidebarLink";

const Sidebar = () => {
  const location = useLocation();

  const NavLink ={
    Dashboard: {
      icon: <LayoutDashboard />,
      label: "Dashboard",
      href: "/dashboard",
    },
    ManageUser: {
      icon: <UserIcon />,
      label: "Manage User",
      href: "/dashboard/manage-user",
    },
    
  }
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-3 flex flex-col gap-1">
       {Object.values(NavLink).map((link) => (
        <SidebarLink key={link.label} {...link} isActive={location.pathname === link.href} />
       ))}
      </nav>
    </div>
  );
};

export default Sidebar;

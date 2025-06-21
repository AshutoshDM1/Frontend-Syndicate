import { Link } from 'react-router';

const SidebarLink = ({
  icon,
  label,
  href,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link to={href}>
        <div className={`flex items-center gap-3 p-2 rounded-md ${isActive ? 'bg-orange-50 text-orange-500 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
        {icon}
        {label}
      </div>
    </Link>
  );
};

export default SidebarLink;

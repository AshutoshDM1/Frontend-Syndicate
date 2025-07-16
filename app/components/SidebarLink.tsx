import { Link } from 'react-router';

const SidebarLink = ({
  icon,
  label,
  href,
  isActive,
  isMobile = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isMobile?: boolean;
}) => {
  if (isMobile) {
    return (
      <Link
        to={href}
        className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-h-[60px] justify-center mobile-touch-target mobile-nav-item"
      >
        <div
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          {icon}
          <span className="text-xs text-center leading-tight font-medium">{label}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={href}>
      <div
        className={`flex items-center gap-3 p-2 rounded-md transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
      >
        {icon}
        {label}
      </div>
    </Link>
  );
};

export default SidebarLink;

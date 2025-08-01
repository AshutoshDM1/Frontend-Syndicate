import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { ThemeToggle } from './theme-toggle';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface TubelightNavbarProps {
  items: NavItem[];
  className?: string;
}

export function TubelightNavbar({ items, className }: TubelightNavbarProps) {
  const [activeTab, setActiveTab] = useState(items[items.length - 1].name);

  return (
    <>
      <div
        className={cn(
          'fixed top-0 sm:top-0 left-[50%] lg:left-[55%] -translate-x-1/2 z-50 mb-6 sm:pt-4',
          className
        )}
      >
        {activeTab === 'Themes' && (
          <div className="absolute top-5 -right-16 bg-background/50 z-50">
            <ThemeToggle />
          </div>
        )}
        <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  'relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors',
                  'text-foreground/80 hover:text-primary',
                  isActive && 'bg-muted text-primary'
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

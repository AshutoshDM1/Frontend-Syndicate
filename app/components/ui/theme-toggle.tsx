import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useTheme } from '~/components/theme-provider';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('light')}>
          <Sun className="dark:hover:text-primary  mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('dark')}>
          <Moon className="dark:hover:text-primary  mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('system')}>
          <Monitor className="dark:hover:text-primary  mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

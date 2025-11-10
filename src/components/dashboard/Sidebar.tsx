'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/posts',
    label: 'Posts',
    icon: FileText,
  },
  {
    href: '/dashboard/posts/new',
    label: 'Create Post',
    icon: PlusCircle,
  },
  {
    href: '/dashboard/categories/manage',
    label: 'Categories',
    icon: FolderTree,
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-full justify-start">
        <Sun className="h-4 w-4 mr-2" />
        Theme
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-full justify-start"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4 mr-2" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 mr-2" />
          Dark Mode
        </>
      )}
    </Button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="sticky top-0 h-screen w-64 border-r bg-background flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xl font-bold transition-colors hover:opacity-80"
          style={{ color: 'var(--color-primary)' }}
        >
          <LayoutDashboard className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent',
                  active
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Theme Toggle at Bottom */}
      <div className="p-4 border-t">
        <ThemeToggle />
      </div>
    </aside>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Car, CalendarCheck, CreditCard, Settings, LogOut, ChevronLeft, ChevronRight, User, Bell,  } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const navGroups = [
  {
    id: 'group-main',
    label: 'Main',
    items: [
      {
        id: 'nav-browse',
        label: 'Browse Vehicles',
        href: '/vehicle-listing',
        icon: <Car size={18} />,
      },
      {
        id: 'nav-bookings',
        label: 'My Bookings',
        href: '/my-bookings',
        icon: <CalendarCheck size={18} />,
        badge: 2,
      },
    ] as NavItem[],
  },
  {
    id: 'group-account',
    label: 'Account',
    items: [
      {
        id: 'nav-profile',
        label: 'Profile',
        href: '#',
        icon: <User size={18} />,
      },
      {
        id: 'nav-payments',
        label: 'Payments',
        href: '#',
        icon: <CreditCard size={18} />,
      },
      {
        id: 'nav-notifications',
        label: 'Notifications',
        href: '#',
        icon: <Bell size={18} />,
        badge: 3,
      },
      {
        id: 'nav-settings',
        label: 'Settings',
        href: '#',
        icon: <Settings size={18} />,
      },
    ] as NavItem[],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`
        relative flex flex-col bg-white border-r border-[hsl(var(--border))] h-screen
        sidebar-transition flex-shrink-0
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-[hsl(var(--border))] px-3 flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-[15px] text-[hsl(var(--primary))] tracking-tight">
            ZoomRental
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.id}>
            {!collapsed && (
              <p className="text-[10px] font-600 uppercase tracking-widest text-[hsl(var(--muted-foreground))] px-2 mb-1.5">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center rounded-lg transition-all duration-150 group relative
                        ${collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-2.5 py-2'}
                        ${isActive
                          ? 'bg-[hsl(211,80%,28%,0.1)] text-[hsl(var(--primary))]'
                          : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]'
                        }
                      `}
                    >
                      <span className={`flex-shrink-0 ${isActive ? 'text-[hsl(var(--primary))]' : ''}`}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className={`text-sm font-medium flex-1 ${isActive ? 'font-semibold' : ''}`}>
                          {item.label}
                        </span>
                      )}
                      {!collapsed && item.badge && (
                        <span className="bg-[hsl(var(--accent))] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge && (
                        <span className="absolute top-1 right-1 bg-[hsl(var(--accent))] text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      {/* Tooltip for collapsed */}
                      {collapsed && (
                        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-150">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-[hsl(var(--border))] p-2 flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-[hsl(211,80%,28%,0.12)] flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[hsl(var(--primary))]">AR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Arjun Reddy</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">arjun@example.in</p>
            </div>
            <button
              className="p-1.5 rounded-md hover:bg-red-50 text-[hsl(var(--muted-foreground))] hover:text-red-600 transition-colors"
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button
            className="w-full flex justify-center p-2.5 rounded-lg hover:bg-red-50 text-[hsl(var(--muted-foreground))] hover:text-red-600 transition-colors group relative"
            title="Sign out"
          >
            <LogOut size={18} />
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
              Sign out
            </span>
          </button>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-[hsl(var(--border))] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
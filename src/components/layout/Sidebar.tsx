import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { NavigationPage } from '../../types';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  UserCheck,
  FileCheck2,
  CreditCard,
  TrendingUp,
  BarChart3,
  Sparkles,
  Calendar,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const {
    currentPage,
    setCurrentPage,
    unreadNotificationCount,
    homeworkList,
    payments,
  } = useApp();

  const pendingPaymentsCount = payments.filter(
    (p) => p.status === 'pending' || p.status === 'overdue'
  ).length;
  const activeHomeworkCount = homeworkList.filter(
    (h) => h.status === 'in_progress' || h.status === 'late'
  ).length;

  const navItems: {
    id: NavigationPage;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'students', label: t.nav.students, icon: Users },
    { id: 'lessons', label: t.nav.lessons, icon: BookOpen },
    { id: 'attendance', label: t.nav.attendance, icon: UserCheck },
    {
      id: 'homework',
      label: t.nav.homework,
      icon: FileCheck2,
      badge: activeHomeworkCount > 0 ? activeHomeworkCount : undefined,
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400',
    },
    {
      id: 'payments',
      label: t.nav.payments,
      icon: CreditCard,
      badge: pendingPaymentsCount > 0 ? pendingPaymentsCount : undefined,
      badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400',
    },
    { id: 'progress', label: t.nav.progress, icon: TrendingUp },
    { id: 'reports', label: t.nav.reports, icon: BarChart3 },
    {
      id: 'ai-assistant',
      label: t.nav.aiAssistant,
      icon: Sparkles,
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400',
    },
    { id: 'calendar', label: t.nav.calendar, icon: Calendar },
    {
      id: 'notifications',
      label: t.nav.notifications,
      icon: Bell,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400',
    },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 h-screen sticky top-0 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 z-40 ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200/80 dark:border-neutral-800">
        <div
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center gap-3 cursor-pointer overflow-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xs shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white leading-none">
                Teacher OS
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate mt-1">
                {t.brand}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={collapsed ? t.nav.expand : t.nav.collapse}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive
                    ? 'text-white dark:text-neutral-900'
                    : 'text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100'
                }`}
              />

              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!collapsed && item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-semibold ${
                    isActive
                      ? 'bg-neutral-700 text-white dark:bg-neutral-200 dark:text-neutral-900'
                      : item.badgeColor || 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {collapsed && item.badge !== undefined && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-neutral-900" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: Teacher Profile */}
      <div className="p-3 border-t border-neutral-200/80 dark:border-neutral-800">
        <div
          onClick={() => setCurrentPage('settings')}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
            collapsed ? 'justify-center p-1' : ''
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-neutral-300 dark:ring-neutral-700"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                {currentUser.subject}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

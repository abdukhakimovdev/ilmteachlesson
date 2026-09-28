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
  X,
  GraduationCap,
  LogOut,
} from 'lucide-react';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ open, onClose }) => {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();
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
  }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'students', label: t.nav.students, icon: Users },
    { id: 'lessons', label: t.nav.lessons, icon: BookOpen },
    { id: 'attendance', label: t.nav.attendance, icon: UserCheck },
    { id: 'homework', label: t.nav.homework, icon: FileCheck2, badge: activeHomeworkCount },
    { id: 'payments', label: t.nav.payments, icon: CreditCard, badge: pendingPaymentsCount },
    { id: 'progress', label: t.nav.progress, icon: TrendingUp },
    { id: 'reports', label: t.nav.reports, icon: BarChart3 },
    { id: 'ai-assistant', label: t.nav.aiAssistant, icon: Sparkles },
    { id: 'calendar', label: t.nav.calendar, icon: Calendar },
    { id: 'notifications', label: t.nav.notifications, icon: Bell, badge: unreadNotificationCount },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 border-r border-neutral-200 dark:border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-neutral-900 dark:text-white">
                Teacher OS
              </span>
              <p className="text-[10px] text-neutral-400">Classroom Suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
              {currentUser.name}
            </h4>
            <p className="text-[11px] text-neutral-500 truncate">{currentUser.subject}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.nav.logout}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

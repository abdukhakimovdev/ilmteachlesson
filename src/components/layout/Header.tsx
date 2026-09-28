import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import {
  Search,
  Sun,
  Moon,
  Bell,
  Menu,
  CheckCheck,
  Trash2,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileNav }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const {
    currentPage,
    setCurrentPage,
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
    clearNotifications,
    setCommandPaletteOpen,
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return t.nav.dashboard;
      case 'students':
        return t.nav.students;
      case 'lessons':
        return t.nav.lessons;
      case 'attendance':
        return t.nav.attendance;
      case 'homework':
        return t.nav.homework;
      case 'payments':
        return t.nav.payments;
      case 'progress':
        return t.nav.progress;
      case 'reports':
        return t.nav.reports;
      case 'ai-assistant':
        return t.nav.aiAssistant;
      case 'calendar':
        return t.nav.calendar;
      case 'notifications':
        return t.nav.notifications;
      case 'settings':
        return t.nav.settings;
      default:
        return 'Teacher OS';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* Left: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileNav}
          className="p-2 -ml-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            {getPageTitle()}
          </h1>
          <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 dark:text-neutral-500">
            ·
          </span>
          <span className="hidden sm:inline-block text-xs text-neutral-500 dark:text-neutral-400">
            Teacher OS
          </span>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/60 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>{t.header.searchPlaceholder}</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Search on mobile, Lang, Theme, Notifications, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile search icon button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg lg:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Language Selector */}
        <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60">
          {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md transition-all ${
                language === lang
                  ? 'bg-white dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={t.header.notifications}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-pulse" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                    {t.header.notifications}
                  </span>
                  {unreadNotificationCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono">
                      {unreadNotificationCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={markAllNotificationsRead}
                    title={t.header.markAllRead}
                    className="p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={clearNotifications}
                    title={t.header.clearAll}
                    className="p-1 text-neutral-400 hover:text-red-500 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-neutral-400">
                    {t.header.noNotifications}
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.link) setCurrentPage(n.link);
                        setNotificationsOpen(false);
                      }}
                      className={`px-4 py-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
                        !n.read ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-neutral-400 shrink-0 font-mono">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <button
                  onClick={() => {
                    setCurrentPage('notifications');
                    setNotificationsOpen(false);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  {t.dashboard.allLessons} →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Teacher Avatar & Profile Menu */}
        <div className="relative pl-1 sm:pl-2" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="User profile menu"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-300 dark:ring-neutral-700"
              onError={(e) => {
                // Fallback initial avatar
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-neutral-900 dark:text-white leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                {t.header.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3.5 py-2 border-b border-neutral-100 dark:border-neutral-800">
                <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {currentUser.email}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentPage('settings');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <User className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{t.header.profile}</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('settings');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{t.header.settings}</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('ai-assistant');
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{t.header.help}</span>
                </button>
              </div>

              <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.nav.logout}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

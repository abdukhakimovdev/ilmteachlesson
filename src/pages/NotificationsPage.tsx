import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Info,
  ArrowRight,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { t } = useLanguage();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    setCurrentPage,
  } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      default:
        return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.notifications.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.notifications.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-emerald-500" />
            <span>{t.notifications.markAllRead}</span>
          </button>
          <button
            onClick={clearNotifications}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.notifications.clear}</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-2xs divide-y divide-neutral-100 dark:divide-neutral-800">
        {notifications.length === 0 ? (
          <div className="py-16 text-center text-xs text-neutral-400">
            <Bell className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-2" />
            <span>{t.notifications.empty}</span>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.link) setCurrentPage(n.link);
              }}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors ${
                !n.read ? 'bg-indigo-50/20 dark:bg-indigo-950/15' : ''
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {n.message}
                  </p>
                  <span className="text-[11px] font-mono text-neutral-400 mt-2 block">
                    {n.timestamp}
                  </span>
                </div>
              </div>

              {n.link && (
                <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold shrink-0">
                  <span className="hidden sm:inline">Open</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

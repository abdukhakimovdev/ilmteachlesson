import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  Search,
  UserPlus,
  BookOpen,
  FileCheck2,
  CreditCard,
  BarChart3,
  Sparkles,
  Settings,
  Users,
  Calendar,
  X,
  ArrowRight,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { t } = useLanguage();
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    students,
    lessons,
    homeworkList,
    payments,
    setCurrentPage,
    openStudentProfile,
    openQuickModal,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const matchedStudents = q
    ? students.filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.group.toLowerCase().includes(q) ||
          s.phone.includes(q)
      )
    : [];

  const matchedLessons = q
    ? lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.topic.toLowerCase().includes(q) ||
          l.group.toLowerCase().includes(q)
      )
    : [];

  const matchedHomework = q
    ? homeworkList.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.group.toLowerCase().includes(q) ||
          (h.studentName && h.studentName.toLowerCase().includes(q))
      )
    : [];

  const matchedPayments = q
    ? payments.filter(
        (p) =>
          p.studentName.toLowerCase().includes(q) ||
          p.group.toLowerCase().includes(q) ||
          p.status.toLowerCase().includes(q)
      )
    : [];

  const quickActions = [
    {
      id: 'qa-add-student',
      title: t.dashboard.addStudent,
      category: t.nav.students,
      icon: UserPlus,
      action: () => {
        openQuickModal('add-student');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'qa-create-lesson',
      title: t.dashboard.createLesson,
      category: t.nav.lessons,
      icon: BookOpen,
      action: () => {
        openQuickModal('create-lesson');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'qa-assign-homework',
      title: t.dashboard.assignHomework,
      category: t.nav.homework,
      icon: FileCheck2,
      action: () => {
        openQuickModal('assign-homework');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'qa-record-payment',
      title: t.dashboard.recordPayment,
      category: t.nav.payments,
      icon: CreditCard,
      action: () => {
        openQuickModal('record-payment');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'qa-reports',
      title: t.dashboard.generateReport,
      category: t.nav.reports,
      icon: BarChart3,
      action: () => {
        setCurrentPage('reports');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'qa-ai-assistant',
      title: t.dashboard.askAi,
      category: t.nav.aiAssistant,
      icon: Sparkles,
      action: () => {
        setCurrentPage('ai-assistant');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'qa-settings',
      title: t.nav.settings,
      category: t.nav.settings,
      icon: Settings,
      action: () => {
        setCurrentPage('settings');
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filteredQuickActions = q
    ? quickActions.filter((qa) => qa.title.toLowerCase().includes(q))
    : quickActions;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-neutral-900/60 backdrop-blur-xs">
      <div
        className="fixed inset-0"
        onClick={() => setCommandPaletteOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.header.searchPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Matched Students */}
          {matchedStudents.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                {t.nav.students} ({matchedStudents.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedStudents.slice(0, 5).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      openStudentProfile(s.id);
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                        {s.firstName[0]}
                        {s.lastName[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {s.firstName} {s.lastName}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {s.group} · {s.phone}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Lessons */}
          {matchedLessons.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                {t.nav.lessons} ({matchedLessons.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedLessons.slice(0, 3).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setCurrentPage('lessons');
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {l.title}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {l.startTime} - {l.endTime} · {l.group} · {l.room}-room
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Homework */}
          {matchedHomework.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                {t.nav.homework} ({matchedHomework.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedHomework.slice(0, 3).map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setCurrentPage('homework');
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck2 className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {h.title}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {h.group} · Due: {h.deadline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Payments */}
          {matchedPayments.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                {t.nav.payments} ({matchedPayments.length})
              </div>
              <div className="space-y-1 mt-1">
                {matchedPayments.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentPage('payments');
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {p.studentName} — {new Intl.NumberFormat('uz-UZ').format(p.amount)} UZS
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {p.group} · Status: {p.status}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions / Jump to navigation */}
          {filteredQuickActions.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                {t.header.quickActions}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {filteredQuickActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button
                      key={qa.id}
                      onClick={qa.action}
                      className="flex items-center gap-3 p-2.5 rounded-xl text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                          {qa.title}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">{qa.category}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty search state */}
          {q &&
            matchedStudents.length === 0 &&
            matchedLessons.length === 0 &&
            matchedHomework.length === 0 &&
            matchedPayments.length === 0 &&
            filteredQuickActions.length === 0 && (
              <div className="py-12 text-center text-xs text-neutral-500">
                No matching results found for "{query}".
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
          <span>Navigate with mouse or tap</span>
          <span>Teacher OS Command Engine</span>
        </div>
      </div>
    </div>
  );
};

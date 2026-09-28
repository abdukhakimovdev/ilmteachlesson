import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Users,
  BookOpen,
  CreditCard,
  AlertCircle,
  TrendingUp,
  UserPlus,
  FileCheck2,
  BarChart3,
  Sparkles,
  Play,
  UserCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const {
    students,
    lessons,
    payments,
    setCurrentPage,
    openQuickModal,
    openStudentProfile,
    startLesson,
  } = useApp();

  const [filterDate] = useState(new Date().toISOString().split('T')[0]);

  // Derived Metrics
  const totalStudents = students.length;
  const todayLessons = lessons.filter((l) => l.date === filterDate || l.status !== 'completed');
  const unpaidCount = payments.filter((p) => p.status === 'overdue' || p.status === 'pending').length;
  const totalIncome = payments
    .filter((p) => p.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Today's lessons list
  const displayLessons = todayLessons.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Greeting & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.dashboard.greeting}, {currentUser.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openQuickModal('add-student')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ {t.dashboard.addStudent}</span>
          </button>
        </div>
      </div>

      {/* 2. Four Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Students */}
        <div
          onClick={() => setCurrentPage('students')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.dashboard.totalStudents}
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
              {totalStudents}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.dashboard.trendStudents}</span>
          </div>
        </div>

        {/* Card 2: Today's Lessons */}
        <div
          onClick={() => setCurrentPage('lessons')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.dashboard.todayLessons}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
              {displayLessons.length}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.dashboard.trendLessons}</span>
          </div>
        </div>

        {/* Card 3: Monthly Income */}
        <div
          onClick={() => setCurrentPage('payments')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-800/80 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.dashboard.monthlyIncome}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
              {new Intl.NumberFormat('uz-UZ').format(totalIncome || 7200000)}
            </span>
            <span className="text-xs font-semibold text-neutral-400 font-mono">UZS</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{t.dashboard.trendIncome}</span>
          </div>
        </div>

        {/* Card 4: Unpaid / Overdue Payments */}
        <div
          onClick={() => setCurrentPage('payments')}
          className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-red-300 dark:hover:border-red-800/80 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {t.dashboard.unpaidPayments}
            </span>
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white">
              {unpaidCount}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
            <span>{t.dashboard.trendOverdue}</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3.5">
          {t.dashboard.quickActionsTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => openQuickModal('add-student')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-neutral-200/60 dark:border-neutral-700/60 transition-all cursor-pointer text-center group"
          >
            <UserPlus className="w-5 h-5 mb-1.5 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{t.dashboard.addStudent}</span>
          </button>

          <button
            onClick={() => openQuickModal('create-lesson')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 border border-neutral-200/60 dark:border-neutral-700/60 transition-all cursor-pointer text-center group"
          >
            <BookOpen className="w-5 h-5 mb-1.5 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{t.dashboard.createLesson}</span>
          </button>

          <button
            onClick={() => openQuickModal('assign-homework')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 border border-neutral-200/60 dark:border-neutral-700/60 transition-all cursor-pointer text-center group"
          >
            <FileCheck2 className="w-5 h-5 mb-1.5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{t.dashboard.assignHomework}</span>
          </button>

          <button
            onClick={() => openQuickModal('record-payment')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-neutral-700 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-neutral-200/60 dark:border-neutral-700/60 transition-all cursor-pointer text-center group"
          >
            <CreditCard className="w-5 h-5 mb-1.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{t.dashboard.recordPayment}</span>
          </button>

          <button
            onClick={() => setCurrentPage('reports')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 border border-neutral-200/60 dark:border-neutral-700/60 transition-all cursor-pointer text-center group"
          >
            <BarChart3 className="w-5 h-5 mb-1.5 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{t.dashboard.generateReport}</span>
          </button>

          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-tr from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 hover:from-indigo-100 dark:hover:from-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800/70 transition-all cursor-pointer text-center group"
          >
            <Sparkles className="w-5 h-5 mb-1.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">{t.dashboard.askAi}</span>
          </button>
        </div>
      </div>

      {/* 4. Main Section: Today's Lessons & Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Today's Lessons (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {t.dashboard.todayLessonsTitle}
            </h3>
            <button
              onClick={() => setCurrentPage('lessons')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.dashboard.allLessons}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {displayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono font-bold text-xs shrink-0 mt-0.5">
                      {lesson.startTime}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                          {lesson.title}
                        </h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                          {lesson.group}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 flex-wrap">
                        <span>{lesson.studentCount} {t.dashboard.studentsCount}</span>
                        <span>·</span>
                        <span>{lesson.room}-{t.dashboard.room}</span>
                        <span>·</span>
                        <span className="truncate max-w-xs">{lesson.topic}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions for this lesson */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => startLesson(lesson.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{t.dashboard.startLesson}</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage('attendance')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{t.dashboard.markAttendance}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Attendance & Recent Activity (1 col) */}
        <div className="space-y-6">
          {/* Attendance Overview Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                {t.dashboard.attendanceRate}
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                89.4%
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              Average weekly student presence across all 5 groups.
            </p>

            {/* Attendance Bar Visualization */}
            <div className="space-y-2.5">
              {[
                { group: 'Python-003', rate: 91, color: 'bg-indigo-500' },
                { group: 'Frontend-01', rate: 94, color: 'bg-emerald-500' },
                { group: 'Scratch-02', rate: 96, color: 'bg-amber-500' },
                { group: 'Robotics-01', rate: 77, color: 'bg-rose-500' },
                { group: 'English-B1', rate: 93, color: 'bg-teal-500' },
              ].map((g) => (
                <div key={g.group} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {g.group}
                    </span>
                    <span className="font-mono text-neutral-500 text-[11px]">{g.rate}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`${g.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${g.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Student Highlights */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">
              {t.dashboard.recentActivity}
            </h4>
            <div className="space-y-3 divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {students.slice(0, 4).map((s) => (
                <div
                  key={s.id}
                  onClick={() => openStudentProfile(s.id)}
                  className="pt-2.5 first:pt-0 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg ${s.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}
                    >
                      {s.firstName[0]}
                      {s.lastName[0]}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {s.firstName} {s.lastName}
                      </span>
                      <span className="text-[11px] text-neutral-400 block">{s.group}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      {s.progress}%
                    </span>
                    <span className="text-[10px] text-neutral-400 block font-mono">progress</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

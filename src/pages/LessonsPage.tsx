import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Lesson } from '../types';
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  Play,
  UserCheck,
  Clock,
  MapPin,
  Users,
  FileCheck2,
  Trash2,
} from 'lucide-react';
import { CreateLessonModal } from '../components/modals/CreateLessonModal';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';

export const LessonsPage: React.FC = () => {
  const { t } = useLanguage();
  const { lessons, deleteLesson, startLesson, setCurrentPage } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month'>('week');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.lessons.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.lessons.subtitle} ({lessons.length} {t.nav.lessons.toLowerCase()})
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View switcher */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title={t.lessons.viewList}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title={t.lessons.viewCalendar}
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ {t.lessons.createLessonBtn}</span>
          </button>
        </div>
      </div>

      {/* Period Filter Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-1.5">
          {(['today', 'week', 'month'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-colors cursor-pointer ${
                filterPeriod === p
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {p === 'today' ? t.lessons.today : p === 'week' ? t.lessons.week : t.lessons.month}
            </button>
          ))}
        </div>

        <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
          {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* List or Calendar View */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-2xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Time box */}
                  <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white shrink-0 min-w-18">
                    <span className="font-mono font-bold text-xs sm:text-sm">
                      {lesson.startTime}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {lesson.endTime}
                    </span>
                  </div>

                  {/* Lesson details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                        {lesson.title}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        {lesson.group}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {lesson.date}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      {lesson.topic}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {lesson.room}-{t.dashboard.room}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {lesson.studentCount} {t.dashboard.studentsCount}
                      </span>
                      {lesson.homework && (
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                          <FileCheck2 className="w-3.5 h-3.5" /> {lesson.homework}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right action controls */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => startLesson(lesson.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.lessons.startNow}</span>
                  </button>

                  <button
                    onClick={() => setCurrentPage('attendance')}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{t.dashboard.markAttendance}</span>
                  </button>

                  <button
                    onClick={() => setLessonToDelete(lesson)}
                    className="p-2 text-neutral-400 hover:text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title={t.students.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Calendar Grid View */
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-indigo-400 dark:hover:border-indigo-700 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                    {lesson.startTime}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {lesson.date}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    {lesson.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {lesson.group} · {lesson.room}-room
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    {lesson.studentCount} {t.dashboard.studentsCount}
                  </span>
                  <button
                    onClick={() => startLesson(lesson.id)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    {t.dashboard.startLesson} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Modal */}
      <CreateLessonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={lessonToDelete !== null}
        title="Darsni jadvaldan o‘chirish"
        description={lessonToDelete ? `${lessonToDelete.title} (${lessonToDelete.group})` : ''}
        onCancel={() => setLessonToDelete(null)}
        onConfirm={() => {
          if (lessonToDelete) {
            deleteLesson(lessonToDelete.id);
            setLessonToDelete(null);
          }
        }}
      />
    </div>
  );
};

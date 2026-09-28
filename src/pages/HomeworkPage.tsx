import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { HomeworkItem } from '../types';
import {
  FileCheck2,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ChevronDown,
} from 'lucide-react';
import { CreateHomeworkModal } from '../components/modals/CreateHomeworkModal';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';

export const HomeworkPage: React.FC = () => {
  const { t } = useLanguage();
  const { homeworkList, updateHomeworkStatus, deleteHomework } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [hwToDelete, setHwToDelete] = useState<HomeworkItem | null>(null);
  const [filterDiff, setFilterDiff] = useState<string>('all');

  // Stats
  const assignedTotal = homeworkList.length;
  const submittedCount = homeworkList.filter((h) => h.status === 'submitted' || h.status === 'completed').length;
  const pendingCount = homeworkList.filter((h) => h.status === 'in_progress').length;
  const lateCount = homeworkList.filter((h) => h.status === 'late').length;

  const filteredList = filterDiff === 'all'
    ? homeworkList
    : homeworkList.filter((h) => h.difficulty === filterDiff);

  const getDifficultyBadge = (diff: HomeworkItem['difficulty']) => {
    switch (diff) {
      case 'easy':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
            {t.homework.easy}
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
            {t.homework.medium}
          </span>
        );
      case 'hard':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400">
            {t.homework.hard}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.homework.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.homework.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ {t.homework.createBtn}</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.homework.assigned}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
            {assignedTotal}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.homework.submitted}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {submittedCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.homework.pendingReview}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
            {pendingCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.homework.late}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
            {lateCount}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">{t.homework.filterDifficulty}:</span>
          {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDiff(diff)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                filterDiff === diff
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {diff === 'all' ? t.students.all : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Homework Cards List */}
      <div className="space-y-3">
        {filteredList.map((hw) => (
          <div
            key={hw.id}
            className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                      {hw.title}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      {hw.group}
                    </span>
                    {getDifficultyBadge(hw.difficulty)}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {hw.description}
                  </p>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <select
                  value={hw.status}
                  onChange={(e) => updateHomeworkStatus(hw.id, e.target.value as any)}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-neutral-200 focus:outline-hidden"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="late">Late</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => setHwToDelete(hw)}
                  className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-400 flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Assigned: {hw.assignedDate}
                </span>
                <span className="flex items-center gap-1 font-semibold text-neutral-600 dark:text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Deadline: {hw.deadline}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono">
                  {hw.submissionsCount} / {hw.totalCount} submitted
                </span>
                <div className="w-20 bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(hw.submissionsCount / hw.totalCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateHomeworkModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <DeleteConfirmModal
        isOpen={hwToDelete !== null}
        title="Topshiriqni o‘chirish"
        description={hwToDelete ? hwToDelete.title : ''}
        onCancel={() => setHwToDelete(null)}
        onConfirm={() => {
          if (hwToDelete) {
            deleteHomework(hwToDelete.id);
            setHwToDelete(null);
          }
        }}
      />
    </div>
  );
};

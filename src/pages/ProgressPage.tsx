import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Users,
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { t } = useLanguage();
  const { students, openStudentProfile } = useApp();

  const [selectedGroup, setSelectedGroup] = useState<string>('Python-003');

  const groupStudents = students.filter((s) => s.group === selectedGroup);

  const avgGrade = groupStudents.length
    ? Math.round(
        groupStudents.reduce((sum, s) => sum + s.averageGrade, 0) / groupStudents.length
      )
    : 85;

  const avgAttendance = groupStudents.length
    ? Math.round(
        groupStudents.reduce((sum, s) => sum + s.attendanceRate, 0) / groupStudents.length
      )
    : 90;

  const avgProgress = groupStudents.length
    ? Math.round(
        groupStudents.reduce((sum, s) => sum + s.progress, 0) / groupStudents.length
      )
    : 82;

  const topStudents = [...groupStudents]
    .sort((a, b) => b.averageGrade - a.averageGrade)
    .slice(0, 3);

  const attentionStudents = [...groupStudents]
    .filter((s) => s.averageGrade < 80 || s.attendanceRate < 85)
    .slice(0, 3);

  const skillsData = [
    { name: 'Python Basics & Types', mastery: 94 },
    { name: 'Conditionals & Logic Gates', mastery: 88 },
    { name: 'While & For Loops', mastery: 81 },
    { name: 'Lists & Slicing', mastery: 78 },
    { name: 'Functions & Scope', mastery: 74 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.progress.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.progress.subtitle}
          </p>
        </div>

        {/* Group Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">{t.progress.selectGroup}:</span>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
          >
            <option value="Python-003">Python-003</option>
            <option value="Frontend-01">Frontend-01</option>
            <option value="Scratch-02">Scratch-02</option>
            <option value="Robotics-01">Robotics-01</option>
            <option value="English-B1">English-B1</option>
          </select>
        </div>
      </div>

      {/* 3 Group Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.progress.avgGrade}
          </span>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-indigo-600 dark:text-indigo-400 mt-2">
            {avgGrade}%
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Based on all quizzes & labs
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.progress.attendanceOverview}
          </span>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400 mt-2">
            {avgAttendance}%
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block">
            Active cohort participation
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.progress.homeworkRate}
          </span>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-violet-600 dark:text-violet-400 mt-2">
            {avgProgress}%
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            Curriculum completion rate
          </span>
        </div>
      </div>

      {/* Main Grid: Skills Mastery + Top Performers / Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Skills Mastery (2 cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                {t.progress.skillProgress}
              </h3>
              <p className="text-xs text-neutral-500">
                Cohort competency benchmarks across topics
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-neutral-400">
              {selectedGroup}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {skillsData.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {s.name}
                  </span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {s.mastery}%
                  </span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Leaderboard & Attention (1 col) */}
        <div className="space-y-6">
          {/* Top Students */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              {t.progress.topStudents}
            </h4>

            <div className="space-y-2.5 divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {topStudents.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => openStudentProfile(s.id)}
                  className="pt-2.5 first:pt-0 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-neutral-400 w-4">
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {s.firstName} {s.lastName}
                      </span>
                      <span className="text-[11px] text-neutral-400 block font-mono">
                        Att: {s.attendanceRate}%
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {s.averageGrade}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attention Required */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              {t.progress.needsAttention}
            </h4>

            {attentionStudents.length === 0 ? (
              <p className="text-xs text-neutral-400">
                All students currently meeting proficiency benchmarks.
              </p>
            ) : (
              <div className="space-y-2.5 divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {attentionStudents.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => openStudentProfile(s.id)}
                    className="pt-2.5 first:pt-0 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-red-500 transition-colors">
                        {s.firstName} {s.lastName}
                      </span>
                      <span className="text-[11px] text-neutral-400 block font-mono">
                        Att: {s.attendanceRate}% · Score: {s.averageGrade}%
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                      Review
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

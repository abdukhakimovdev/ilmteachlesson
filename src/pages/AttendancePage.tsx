import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { AttendanceStatus } from '../types';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Save,
  CheckCheck,
  UserCheck,
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { t } = useLanguage();
  const {
    students,
    lessons,
    attendanceRecords,
    markAttendance,
    markAllPresentForLesson,
    saveAttendanceBatch,
  } = useApp();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGroup, setSelectedGroup] = useState<string>('Python-003');
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    lessons[0]?.id || 'l-1'
  );

  // Filter students by selected group
  const groupStudents = useMemo(() => {
    return students.filter((s) => s.group === selectedGroup);
  }, [students, selectedGroup]);

  // Current attendance map for quick lookup
  const currentAttendance = useMemo(() => {
    const map: Record<string, AttendanceStatus> = {};
    groupStudents.forEach((s) => {
      const rec = attendanceRecords.find(
        (r) =>
          r.studentId === s.id &&
          r.lessonId === selectedLessonId &&
          r.date === selectedDate
      );
      map[s.id] = rec ? rec.status : 'present'; // default present
    });
    return map;
  }, [groupStudents, attendanceRecords, selectedLessonId, selectedDate]);

  // Local working state
  const [statusMap, setStatusMap] = useState<Record<string, AttendanceStatus>>({});

  // Sync working state when group/lesson/date changes
  React.useEffect(() => {
    setStatusMap(currentAttendance);
  }, [currentAttendance]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const next: Record<string, AttendanceStatus> = {};
    groupStudents.forEach((s) => {
      next[s.id] = 'present';
    });
    setStatusMap(next);
    markAllPresentForLesson(
      selectedLessonId,
      selectedDate,
      groupStudents.map((s) => s.id)
    );
  };

  const handleSaveAttendance = () => {
    const batch = groupStudents.map((s) => ({
      id: `att-${Date.now()}-${s.id}`,
      lessonId: selectedLessonId,
      studentId: s.id,
      date: selectedDate,
      status: statusMap[s.id] || 'present',
    }));
    saveAttendanceBatch(batch);
  };

  // Stats calculation
  const total = groupStudents.length;
  const presentCount = Object.values(statusMap).filter((s) => s === 'present').length;
  const absentCount = Object.values(statusMap).filter((s) => s === 'absent').length;
  const lateCount = Object.values(statusMap).filter((s) => s === 'late').length;
  const excusedCount = Object.values(statusMap).filter((s) => s === 'excused').length;
  const attendanceRate = total > 0 ? Math.round(((presentCount + lateCount * 0.8) / total) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.attendance.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.attendance.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-emerald-500" />
            <span>{t.attendance.markAllPresent}</span>
          </button>

          <button
            onClick={handleSaveAttendance}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{t.attendance.saveAttendance}</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar: Date, Group, Lesson */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            {t.attendance.selectDate}
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            {t.attendance.selectGroup}
          </label>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
          >
            <option value="Python-003">Python-003</option>
            <option value="Frontend-01">Frontend-01</option>
            <option value="Scratch-02">Scratch-02</option>
            <option value="Robotics-01">Robotics-01</option>
            <option value="English-B1">English-B1</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            {t.attendance.selectLesson}
          </label>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
          >
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.startTime} — {l.title} ({l.group})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.attendance.presentCount}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {presentCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.attendance.absentCount}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-red-600 dark:text-red-400 mt-1">
            {absentCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.attendance.lateCount}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">
            {lateCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-[11px] text-neutral-500 block">{t.attendance.rate}</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {attendanceRate}%
          </div>
        </div>
      </div>

      {/* Students Attendance List */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-900 dark:text-white">
            {selectedGroup} — {groupStudents.length} {t.dashboard.studentsCount}
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            {selectedDate}
          </span>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {groupStudents.map((student) => {
            const currentStatus = statusMap[student.id] || 'present';
            return (
              <div
                key={student.id}
                className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
              >
                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl ${student.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}
                  >
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                      {student.firstName} {student.lastName}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      Overall: {student.attendanceRate}%
                    </p>
                  </div>
                </div>

                {/* 4 Status Toggle Buttons */}
                <div className="flex items-center gap-1 self-end sm:self-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <button
                    onClick={() => handleStatusChange(student.id, 'present')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      currentStatus === 'present'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.attendance.present}</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(student.id, 'absent')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      currentStatus === 'absent'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>{t.attendance.absent}</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(student.id, 'late')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      currentStatus === 'late'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.attendance.late}</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(student.id, 'excused')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      currentStatus === 'excused'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t.attendance.excused}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

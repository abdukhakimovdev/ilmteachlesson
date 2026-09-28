import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import {
  X,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2,
  CreditCard,
  TrendingUp,
  Award,
  Sparkles,
  Save,
} from 'lucide-react';

interface StudentProfileModalProps {
  student: Student | null | undefined;
  onClose: () => void;
  onEdit: (student: Student) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  onEdit,
}) => {
  const { t } = useLanguage();
  const { updateStudent, homeworkList, payments, addToast, setCurrentPage, openQuickModal } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'attendance' | 'grades' | 'homework' | 'payments' | 'notes'
  >('overview');
  const [noteText, setNoteText] = useState(student?.notes || '');

  if (!student) return null;

  const studentHomework = homeworkList.filter(
    (h) => h.group === student.group || h.studentId === student.id
  );
  const studentPayments = payments.filter((p) => p.studentId === student.id);

  const handleSaveNote = () => {
    updateStudent(student.id, { notes: noteText });
    addToast('Note Saved', 'Teacher notes updated for this student.');
  };

  const getStatusBadge = (status: Student['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3" /> {t.students.paid}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3" /> {t.students.pending}
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
            <AlertCircle className="w-3 h-3" /> {t.students.overdue}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Top Header Card */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl ${student.avatarColor} text-white flex items-center justify-center text-lg font-bold shadow-xs shrink-0`}
            >
              {student.firstName[0]}
              {student.lastName[0]}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                  {student.firstName} {student.lastName}
                </h2>
                {getStatusBadge(student.paymentStatus)}
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1 flex-wrap">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {student.group}
                </span>
                <span>·</span>
                <span>{student.course}</span>
                <span>·</span>
                <span>{student.age} yosh</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-neutral-400" />
                  {student.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              {t.students.edit}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-x-auto">
          {[
            { id: 'overview', label: t.studentProfile.overview },
            { id: 'attendance', label: t.studentProfile.attendance },
            { id: 'grades', label: t.studentProfile.grades },
            { id: 'homework', label: t.studentProfile.homework },
            { id: 'payments', label: t.studentProfile.payments },
            { id: 'notes', label: t.studentProfile.notes },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                  <span className="text-[11px] text-neutral-500 block">
                    {t.studentProfile.attendanceRate}
                  </span>
                  <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                    {student.attendanceRate}%
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${student.attendanceRate}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                  <span className="text-[11px] text-neutral-500 block">
                    {t.studentProfile.averageGrade}
                  </span>
                  <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                    {student.averageGrade}%
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all"
                      style={{ width: `${student.averageGrade}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                  <span className="text-[11px] text-neutral-500 block">
                    {t.studentProfile.currentProgress}
                  </span>
                  <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                    {student.progress}%
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-violet-500 h-full rounded-full transition-all"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                  <span className="text-[11px] text-neutral-500 block">
                    {t.studentProfile.paymentStatus}
                  </span>
                  <div className="mt-1">{getStatusBadge(student.paymentStatus)}</div>
                  <span className="text-[10px] text-neutral-400 mt-2 block font-mono">
                    {new Intl.NumberFormat('uz-UZ').format(student.monthlyPayment)} UZS / oy
                  </span>
                </div>
              </div>

              {/* Skills Radar / Progress Bars */}
              <div className="p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                    {t.studentProfile.skillsBreakdown}
                  </h4>
                  <span className="text-[11px] text-neutral-400">
                    {student.course} Curriculum
                  </span>
                </div>

                <div className="space-y-3">
                  {student.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="font-mono text-neutral-500 text-[11px]">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Info & AI Recommendation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850">
                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white mb-2">
                    {t.students.tableParent}
                  </h5>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    {student.parentName}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3 h-3" />
                    {student.parentPhone}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      AI Insights
                    </h5>
                    <button
                      onClick={() => {
                        onClose();
                        setCurrentPage('reports');
                      }}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                    >
                      {t.reports.parentLetterTitle} →
                    </button>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Student shows high consistency in algorithmic reasoning. Recommended to assign
                    bonus recursive logic problems.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. ATTENDANCE TAB */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {t.attendance.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Total classes attended: 23 / 25
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {student.attendanceRate}%
                  </span>
                </div>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200/80 dark:border-neutral-800 rounded-xl overflow-hidden">
                {[
                  { date: '2026-09-28', topic: 'Python While Loops', status: 'present' },
                  { date: '2026-09-25', topic: 'If/Else Logic Branching', status: 'present' },
                  { date: '2026-09-22', topic: 'Variables & User Input', status: 'present' },
                  { date: '2026-09-19', topic: 'Introduction to Algorithms', status: 'late' },
                  { date: '2026-09-16', topic: 'Setup & IDE Config', status: 'present' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 text-xs">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-white">
                          {item.topic}
                        </span>
                        <span className="text-[11px] text-neutral-400 block font-mono">
                          {item.date}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                        item.status === 'present'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. GRADES TAB */}
          {activeTab === 'grades' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    {t.studentProfile.recentGrades}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Graded projects & practical tests
                  </p>
                </div>
                <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {student.averageGrade} / 100
                </span>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200/80 dark:border-neutral-800 rounded-xl overflow-hidden">
                {student.grades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-3.5 text-xs">
                    <div>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {grade.topic}
                      </span>
                      <span className="text-[11px] text-neutral-400 block font-mono">
                        {grade.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                        {grade.score}
                      </span>
                      <span className="text-neutral-400 text-xs">/ 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. HOMEWORK TAB */}
          {activeTab === 'homework' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                  {t.homework.title} ({studentHomework.length})
                </h4>
              </div>

              {studentHomework.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No homework assignments found for this group.
                </div>
              ) : (
                studentHomework.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck2 className="w-4 h-4 text-indigo-500" />
                      <div>
                        <h5 className="font-semibold text-neutral-900 dark:text-white">
                          {hw.title}
                        </h5>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Deadline: {hw.deadline} · Difficulty: {hw.difficulty}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      Completed
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 5. PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {t.payments.monthlyRevenue}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Tuition fee: {new Intl.NumberFormat('uz-UZ').format(student.monthlyPayment)} UZS / mo
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    openQuickModal('record-payment');
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                >
                  + {t.payments.recordBtn}
                </button>
              </div>

              <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200/80 dark:border-neutral-800 rounded-xl overflow-hidden">
                {studentPayments.length === 0 ? (
                  <div className="p-6 text-center text-xs text-neutral-400">
                    No recorded transactions yet.
                  </div>
                ) : (
                  studentPayments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3.5 text-xs">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-4 h-4 text-neutral-400" />
                        <div>
                          <span className="font-semibold text-neutral-900 dark:text-white font-mono">
                            {new Intl.NumberFormat('uz-UZ').format(p.amount)} UZS
                          </span>
                          <span className="text-[11px] text-neutral-400 block">
                            Due: {p.dueDate} {p.paidDate ? `· Paid: ${p.paidDate}` : ''}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(p.status)}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 6. NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                  {t.studentProfile.notes}
                </label>
                <textarea
                  rows={5}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder={t.studentProfile.addNotePlaceholder}
                  className="w-full p-3 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.studentProfile.saveNote}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

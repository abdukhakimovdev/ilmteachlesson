import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Student } from '../types';
import {
  Search,
  UserPlus,
  Eye,
  Edit2,
  Trash2,
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { AddStudentModal } from '../components/modals/AddStudentModal';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';

export const StudentsPage: React.FC = () => {
  const { t } = useLanguage();
  const { students, deleteStudent, openStudentProfile } = useApp();

  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // Unique groups list
  const groups = useMemo(() => {
    const set = new Set(students.map((s) => s.group));
    return Array.from(set);
  }, [students]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.firstName.toLowerCase().includes(search.toLowerCase()) ||
        s.lastName.toLowerCase().includes(search.toLowerCase()) ||
        s.phone.includes(search) ||
        s.parentName.toLowerCase().includes(search.toLowerCase());

      const matchGroup = selectedGroup === 'all' || s.group === selectedGroup;
      const matchPayment = selectedPayment === 'all' || s.paymentStatus === selectedPayment;

      return matchSearch && matchGroup && matchPayment;
    });
  }, [students, search, selectedGroup, selectedPayment]);

  const getPaymentBadge = (status: Student['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3" /> {t.students.paid}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3" /> {t.students.pending}
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
            <AlertCircle className="w-3 h-3" /> {t.students.overdue}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.students.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.students.subtitle} ({filteredStudents.length} {t.dashboard.studentsCount})
          </p>
        </div>

        <button
          onClick={() => {
            setStudentToEdit(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ {t.students.addStudentBtn}</span>
        </button>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.students.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.students.filterGroup}</span>
          </div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
          >
            <option value="all">{t.students.all}</option>
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <span className="text-neutral-300 dark:text-neutral-700">|</span>

          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
          >
            <option value="all">{t.students.all} {t.students.tablePayment}</option>
            <option value="paid">{t.students.paid}</option>
            <option value="pending">{t.students.pending}</option>
            <option value="overdue">{t.students.overdue}</option>
          </select>
        </div>
      </div>

      {/* 3. Empty State */}
      {filteredStudents.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6">
          <UserPlus className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            {t.students.emptyTitle}
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-4">
            {t.students.emptyDesc}
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedGroup('all');
              setSelectedPayment('all');
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
          >
            + {t.students.addStudentBtn}
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-500 uppercase font-semibold tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">{t.students.tableAvatar}</th>
                    <th className="py-3 px-4">{t.students.tableAge}</th>
                    <th className="py-3 px-4">{t.students.tableGroup}</th>
                    <th className="py-3 px-4">{t.students.tableParent}</th>
                    <th className="py-3 px-4">{t.students.tablePhone}</th>
                    <th className="py-3 px-4">{t.students.tableAttendance}</th>
                    <th className="py-3 px-4">{t.students.tableProgress}</th>
                    <th className="py-3 px-4">{t.students.tablePayment}</th>
                    <th className="py-3 px-4 text-right">{t.students.tableActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {filteredStudents.map((s) => (
                    <tr
                      key={s.id}
                      className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                      onClick={() => openStudentProfile(s.id)}
                    >
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl ${s.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                          >
                            {s.firstName[0]}
                            {s.lastName[0]}
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors block">
                              {s.firstName} {s.lastName}
                            </span>
                            <span className="text-[11px] text-neutral-400 block font-normal">
                              {s.course}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Age */}
                      <td className="py-3.5 px-4 font-mono text-neutral-600 dark:text-neutral-400">
                        {s.age}
                      </td>

                      {/* Group */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                          {s.group}
                        </span>
                      </td>

                      {/* Parent */}
                      <td className="py-3.5 px-4 text-neutral-700 dark:text-neutral-300">
                        {s.parentName}
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500">
                        {s.phone}
                      </td>

                      {/* Attendance */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                        <div className="flex items-center gap-1.5">
                          <span>{s.attendanceRate}%</span>
                        </div>
                      </td>

                      {/* Progress */}
                      <td className="py-3.5 px-4">
                        <div className="w-20">
                          <div className="flex justify-between text-[10px] font-mono text-neutral-500 mb-0.5">
                            <span>{s.progress}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-indigo-500 h-full rounded-full"
                              style={{ width: `${s.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">{getPaymentBadge(s.paymentStatus)}</td>

                      {/* Actions */}
                      <td
                        className="py-3.5 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openStudentProfile(s.id)}
                            className="p-1.5 text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title={t.students.viewProfile}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setStudentToEdit(s);
                              setIsAddModalOpen(true);
                            }}
                            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title={t.students.edit}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setStudentToDelete(s)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title={t.students.delete}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredStudents.map((s) => (
              <div
                key={s.id}
                onClick={() => openStudentProfile(s.id)}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-3 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${s.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-2xs`}
                    >
                      {s.firstName[0]}
                      {s.lastName[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                        {s.firstName} {s.lastName}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                          {s.group}
                        </span>
                        <span>·</span>
                        <span>{s.age} yosh</span>
                      </div>
                    </div>
                  </div>
                  {getPaymentBadge(s.paymentStatus)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-50 dark:bg-neutral-800/60 p-2.5 rounded-xl">
                  <div>
                    <span className="text-neutral-400 block text-[10px]">
                      {t.students.tableAttendance}
                    </span>
                    <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                      {s.attendanceRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px]">
                      {t.students.tableProgress}
                    </span>
                    <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                      {s.progress}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{s.phone}</span>
                  </div>

                  <div
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setStudentToEdit(s);
                        setIsAddModalOpen(true);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setStudentToDelete(s)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add / Edit Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setStudentToEdit(null);
        }}
        studentToEdit={studentToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={studentToDelete !== null}
        title={t.students.confirmDeleteTitle}
        description={
          studentToDelete
            ? `${studentToDelete.firstName} ${studentToDelete.lastName} (${studentToDelete.group})`
            : t.students.confirmDeleteDesc
        }
        onCancel={() => setStudentToDelete(null)}
        onConfirm={() => {
          if (studentToDelete) {
            deleteStudent(studentToDelete.id);
            setStudentToDelete(null);
          }
        }}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { X, UserPlus, Check } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentToEdit?: Student | null;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  studentToEdit,
}) => {
  const { t } = useLanguage();
  const { addStudent, updateStudent } = useApp();

  const [firstName, setFirstName] = useState(studentToEdit?.firstName || '');
  const [lastName, setLastName] = useState(studentToEdit?.lastName || '');
  const [age, setAge] = useState(studentToEdit?.age?.toString() || '14');
  const [gender, setGender] = useState<'male' | 'female'>(studentToEdit?.gender || 'male');
  const [phone, setPhone] = useState(studentToEdit?.phone || '+998 ');
  const [parentName, setParentName] = useState(studentToEdit?.parentName || '');
  const [parentPhone, setParentPhone] = useState(studentToEdit?.parentPhone || '+998 ');
  const [group, setGroup] = useState(studentToEdit?.group || 'Python-003');
  const [course, setCourse] = useState(studentToEdit?.course || 'Python Basics');
  const [startDate, setStartDate] = useState(studentToEdit?.startDate || new Date().toISOString().split('T')[0]);
  const [monthlyPayment, setMonthlyPayment] = useState(studentToEdit?.monthlyPayment?.toString() || '650000');
  const [notes, setNotes] = useState(studentToEdit?.notes || '');

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = t.studentModal.requiredError;
    if (!lastName.trim()) errs.lastName = t.studentModal.requiredError;
    if (!age || parseInt(age) < 5 || parseInt(age) > 80) errs.age = t.studentModal.requiredError;
    if (!phone || phone.length < 9) errs.phone = t.studentModal.requiredError;
    if (!parentName.trim()) errs.parentName = t.studentModal.requiredError;
    if (!group) errs.group = t.studentModal.requiredError;
    if (!monthlyPayment) errs.monthlyPayment = t.studentModal.requiredError;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (studentToEdit) {
      updateStudent(studentToEdit.id, {
        firstName,
        lastName,
        age: parseInt(age),
        gender,
        phone,
        parentName,
        parentPhone,
        group,
        course,
        startDate,
        monthlyPayment: parseInt(monthlyPayment) || 600000,
        notes,
      });
    } else {
      addStudent({
        firstName,
        lastName,
        age: parseInt(age) || 14,
        gender,
        phone,
        parentName,
        parentPhone,
        group,
        course,
        startDate,
        monthlyPayment: parseInt(monthlyPayment) || 600000,
        paymentStatus: 'pending',
        attendanceRate: 100,
        progress: 85,
        averageGrade: 88,
        notes,
        avatarColor: 'bg-indigo-600',
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                {studentToEdit ? t.studentModal.titleEdit : t.studentModal.titleAdd}
              </h3>
              <p className="text-xs text-neutral-500">
                {t.brand} · {t.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Row 1: First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.firstName} *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ali"
                className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border rounded-xl text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 ${
                  errors.firstName
                    ? 'border-red-500'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              />
              {errors.firstName && (
                <span className="text-[11px] text-red-500 mt-0.5 block">{errors.firstName}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.lastName} *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Karimov"
                className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border rounded-xl text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 ${
                  errors.lastName
                    ? 'border-red-500'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              />
              {errors.lastName && (
                <span className="text-[11px] text-red-500 mt-0.5 block">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Row 2: Age, Gender, Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.age} *
              </label>
              <input
                type="number"
                min="5"
                max="80"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.gender}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              >
                <option value="male">{t.studentModal.male}</option>
                <option value="female">{t.studentModal.female}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.group} *
              </label>
              <select
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value);
                  if (e.target.value.includes('Python')) setCourse('Python Basics');
                  else if (e.target.value.includes('Frontend')) setCourse('Frontend Development');
                  else if (e.target.value.includes('Scratch')) setCourse('Visual Programming');
                  else if (e.target.value.includes('Robotics')) setCourse('Robotics & Hardware');
                  else if (e.target.value.includes('English')) setCourse('Tech English');
                }}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              >
                <option value="Python-003">Python-003</option>
                <option value="Frontend-01">Frontend-01</option>
                <option value="Scratch-02">Scratch-02</option>
                <option value="Robotics-01">Robotics-01</option>
                <option value="English-B1">English-B1</option>
              </select>
            </div>
          </div>

          {/* Row 3: Phones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.phone} *
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border rounded-xl text-neutral-900 dark:text-white focus:outline-hidden ${
                  errors.phone ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.parentName} *
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Karim Karimov"
                className={`w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border rounded-xl text-neutral-900 dark:text-white focus:outline-hidden ${
                  errors.parentName ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-700'
                }`}
              />
            </div>
          </div>

          {/* Row 4: Parent Phone, Monthly Payment & Start Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.parentPhone}
              </label>
              <input
                type="text"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+998 90 123 45 00"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.monthlyPayment} *
              </label>
              <input
                type="number"
                step="50000"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(e.target.value)}
                placeholder="650000"
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {t.studentModal.startDate}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Row 5: Notes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              {t.studentModal.notes}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Talented in problem solving, friendly demeanor..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            >
              {t.students.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{t.studentModal.save}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

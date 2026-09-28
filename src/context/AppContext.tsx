import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Lesson,
  AttendanceRecord,
  AttendanceStatus,
  HomeworkItem,
  PaymentRecord,
  NotificationItem,
  CalendarEvent,
  NavigationPage,
  ToastMessage,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_LESSONS,
  INITIAL_HOMEWORK,
  INITIAL_PAYMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CALENDAR_EVENTS,
} from '../data/mockData';

interface AppContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  students: Student[];
  lessons: Lesson[];
  attendanceRecords: AttendanceRecord[];
  homeworkList: HomeworkItem[];
  payments: PaymentRecord[];
  notifications: NotificationItem[];
  calendarEvents: CalendarEvent[];
  unreadNotificationCount: number;

  // Student actions
  addStudent: (student: Omit<Student, 'id' | 'skills' | 'grades'>) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  selectedStudentId: string | null;
  openStudentProfile: (id: string) => void;
  closeStudentProfile: () => void;
  selectedStudent: Student | undefined;

  // Lesson actions
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (id: string, updated: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  startLesson: (id: string) => void;

  // Attendance actions
  markAttendance: (lessonId: string, studentId: string, date: string, status: AttendanceStatus) => void;
  markAllPresentForLesson: (lessonId: string, date: string, studentIds: string[]) => void;
  saveAttendanceBatch: (records: AttendanceRecord[]) => void;

  // Homework actions
  addHomework: (hw: Omit<HomeworkItem, 'id' | 'submissionsCount' | 'status'>) => void;
  updateHomeworkStatus: (id: string, status: HomeworkItem['status']) => void;
  deleteHomework: (id: string) => void;

  // Payment actions
  recordPayment: (payment: Omit<PaymentRecord, 'id'>) => void;

  // Notification actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Calendar
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;

  // Quick modals & Command palette
  quickModal: string | null;
  openQuickModal: (modal: string | null) => void;
  closeQuickModal: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Reset
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [quickModal, setQuickModal] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent States
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('teacheros_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('teacheros_lessons');
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('teacheros_attendance');
    if (saved) return JSON.parse(saved);
    // Initialize standard attendance for s-1, s-2 etc.
    return [
      { id: 'att-1', lessonId: 'l-1', studentId: 's-1', date: '2026-09-28', status: 'present' },
      { id: 'att-2', lessonId: 'l-1', studentId: 's-3', date: '2026-09-28', status: 'late' },
      { id: 'att-3', lessonId: 'l-1', studentId: 's-8', date: '2026-09-28', status: 'present' },
      { id: 'att-4', lessonId: 'l-1', studentId: 's-12', date: '2026-09-28', status: 'present' },
      { id: 'att-5', lessonId: 'l-1', studentId: 's-18', date: '2026-09-28', status: 'present' },
    ];
  });

  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(() => {
    const saved = localStorage.getItem('teacheros_homework');
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORK;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('teacheros_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('teacheros_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('teacheros_calendar');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('teacheros_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('teacheros_lessons', JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem('teacheros_attendance', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('teacheros_homework', JSON.stringify(homeworkList));
  }, [homeworkList]);

  useEffect(() => {
    localStorage.setItem('teacheros_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('teacheros_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('teacheros_calendar', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  // Toast dispatch
  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `t-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Student methods
  const addStudent = (studentData: Omit<Student, 'id' | 'skills' | 'grades'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `s-${Date.now()}`,
      skills: [
        { name: 'Core Foundations', level: 75 },
        { name: 'Problem Solving', level: 80 },
        { name: 'Practical Labs', level: 70 },
      ],
      grades: [
        { id: `g-${Date.now()}`, topic: 'Entry Assessment', score: 85, date: studentData.startDate },
      ],
    };
    setStudents((prev) => [newStudent, ...prev]);
    addToast('Student Added', `${studentData.firstName} ${studentData.lastName} enrolled successfully.`);
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    addToast('Updated', 'Student information updated.');
  };

  const deleteStudent = (id: string) => {
    const target = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (selectedStudentId === id) setSelectedStudentId(null);
    addToast('Deleted', target ? `${target.firstName} was removed.` : 'Student removed.', 'info');
  };

  const openStudentProfile = (id: string) => {
    setSelectedStudentId(id);
  };

  const closeStudentProfile = () => {
    setSelectedStudentId(null);
  };

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  // Lesson methods
  const addLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: `l-${Date.now()}`,
    };
    setLessons((prev) => [newLesson, ...prev]);

    // Also add to calendar
    setCalendarEvents((prev) => [
      {
        id: `ce-${Date.now()}`,
        title: `${lessonData.startTime} ${lessonData.title} (${lessonData.group})`,
        date: lessonData.date,
        time: `${lessonData.startTime} - ${lessonData.endTime}`,
        type: 'lesson',
        group: lessonData.group,
        details: `Room ${lessonData.room}`,
      },
      ...prev,
    ]);

    addToast('Lesson Scheduled', `${lessonData.title} scheduled for ${lessonData.date}`);
  };

  const updateLesson = (id: string, updated: Partial<Lesson>) => {
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
    addToast('Lesson Updated', 'Lesson details saved.');
  };

  const deleteLesson = (id: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
    addToast('Lesson Cancelled', 'Lesson removed from schedule.', 'info');
  };

  const startLesson = (id: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'in_progress' } : l))
    );
    addToast('Lesson Started', 'Attendance register opened.', 'info');
    setCurrentPage('attendance');
  };

  // Attendance methods
  const markAttendance = (
    lessonId: string,
    studentId: string,
    date: string,
    status: AttendanceStatus
  ) => {
    setAttendanceRecords((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.lessonId === lessonId && r.studentId === studentId && r.date === date
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], status };
        return copy;
      } else {
        return [...prev, { id: `att-${Date.now()}-${Math.random()}`, lessonId, studentId, date, status }];
      }
    });
  };

  const markAllPresentForLesson = (lessonId: string, date: string, studentIds: string[]) => {
    setAttendanceRecords((prev) => {
      const filtered = prev.filter(
        (r) => !(r.lessonId === lessonId && r.date === date && studentIds.includes(r.studentId))
      );
      const newItems: AttendanceRecord[] = studentIds.map((sid) => ({
        id: `att-${Date.now()}-${sid}`,
        lessonId,
        studentId: sid,
        date,
        status: 'present',
      }));
      return [...filtered, ...newItems];
    });
    addToast('Marked Present', `All ${studentIds.length} students marked present.`);
  };

  const saveAttendanceBatch = (records: AttendanceRecord[]) => {
    setAttendanceRecords((prev) => {
      const recordMap = new Map<string, AttendanceRecord>();
      prev.forEach((r) => recordMap.set(`${r.lessonId}_${r.studentId}_${r.date}`, r));
      records.forEach((r) => recordMap.set(`${r.lessonId}_${r.studentId}_${r.date}`, r));
      return Array.from(recordMap.values());
    });
    addToast('Attendance Saved', 'Daily attendance records successfully synchronized.');
  };

  // Homework methods
  const addHomework = (hwData: Omit<HomeworkItem, 'id' | 'submissionsCount' | 'status'>) => {
    const newHw: HomeworkItem = {
      ...hwData,
      id: `hw-${Date.now()}`,
      status: 'in_progress',
      submissionsCount: 0,
    };
    setHomeworkList((prev) => [newHw, ...prev]);

    // Also add deadline to calendar
    setCalendarEvents((prev) => [
      {
        id: `ce-hw-${Date.now()}`,
        title: `HW Due: ${hwData.title}`,
        date: hwData.deadline,
        time: '23:59',
        type: 'homework',
        group: hwData.group,
      },
      ...prev,
    ]);

    addToast('Assignment Published', `${hwData.title} assigned to ${hwData.group}`);
  };

  const updateHomeworkStatus = (id: string, status: HomeworkItem['status']) => {
    setHomeworkList((prev) => prev.map((h) => (h.id === id ? { ...h, status } : h)));
    addToast('Status Updated', 'Homework status updated.');
  };

  const deleteHomework = (id: string) => {
    setHomeworkList((prev) => prev.filter((h) => h.id !== id));
    addToast('Homework Deleted', 'Assignment removed.', 'info');
  };

  // Payment methods
  const recordPayment = (pData: Omit<PaymentRecord, 'id'>) => {
    const newPayment: PaymentRecord = {
      ...pData,
      id: `p-${Date.now()}`,
      status: 'paid',
    };
    setPayments((prev) => [newPayment, ...prev]);

    // Update student payment status to paid if matched
    setStudents((prev) =>
      prev.map((s) => (s.id === pData.studentId ? { ...s, paymentStatus: 'paid' } : s))
    );

    addToast(
      'Payment Recorded',
      `${new Intl.NumberFormat('uz-UZ').format(pData.amount)} UZS recorded for ${pData.studentName}.`
    );
  };

  // Notification methods
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications', 'All notifications marked as read.', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('Notifications Cleared', 'All notifications cleared.', 'info');
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Calendar
  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents((prev) => [{ ...eventData, id: `ce-${Date.now()}` }, ...prev]);
    addToast('Event Added', 'Calendar updated.');
  };

  // Reset to initial demo data
  const resetToDemoData = () => {
    setStudents(INITIAL_STUDENTS);
    setLessons(INITIAL_LESSONS);
    setHomeworkList(INITIAL_HOMEWORK);
    setPayments(INITIAL_PAYMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    addToast('Demo Restored', 'Teacher OS demo data has been reset to default.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        students,
        lessons,
        attendanceRecords,
        homeworkList,
        payments,
        notifications,
        calendarEvents,
        unreadNotificationCount,

        addStudent,
        updateStudent,
        deleteStudent,
        selectedStudentId,
        openStudentProfile,
        closeStudentProfile,
        selectedStudent,

        addLesson,
        updateLesson,
        deleteLesson,
        startLesson,

        markAttendance,
        markAllPresentForLesson,
        saveAttendanceBatch,

        addHomework,
        updateHomeworkStatus,
        deleteHomework,

        recordPayment,

        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,

        addCalendarEvent,

        quickModal,
        openQuickModal: setQuickModal,
        closeQuickModal: () => setQuickModal(null),
        commandPaletteOpen,
        setCommandPaletteOpen,

        toasts,
        addToast,
        removeToast,

        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

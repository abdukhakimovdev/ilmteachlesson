export type Language = 'uz' | 'ru' | 'en';

export type ThemeMode = 'light' | 'dark' | 'system';

export type NavigationPage =
  | 'dashboard'
  | 'students'
  | 'lessons'
  | 'attendance'
  | 'homework'
  | 'payments'
  | 'progress'
  | 'reports'
  | 'ai-assistant'
  | 'calendar'
  | 'notifications'
  | 'settings';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface StudentSkill {
  name: string;
  level: number; // 0 - 100
}

export interface StudentGrade {
  id: string;
  topic: string;
  score: number; // 0 - 100
  date: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  parentName: string;
  parentPhone: string;
  group: string;
  course: string;
  startDate: string;
  monthlyPayment: number; // in UZS
  paymentStatus: 'paid' | 'pending' | 'overdue';
  attendanceRate: number; // 0 - 100
  progress: number; // 0 - 100
  averageGrade: number; // 0 - 100
  notes: string;
  avatarColor: string;
  skills: StudentSkill[];
  grades: StudentGrade[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  group: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  room: string;
  studentCount: number;
  topic: string;
  homework: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  notes: string;
}

export interface AttendanceRecord {
  id: string;
  lessonId: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  group: string;
  studentId?: string;
  studentName?: string;
  assignedDate: string;
  deadline: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'late' | 'completed';
  submissionsCount: number;
  totalCount: number;
}

export interface PaymentRecord {
  id: string;
  studentId: string;
  studentName: string;
  group: string;
  amount: number; // UZS
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
  link?: NavigationPage;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'lesson' | 'homework' | 'payment' | 'event';
  group?: string;
  details?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  topic?: string;
  codeSnippet?: string;
}

export interface TeacherProfile {
  name: string;
  role: string;
  subject: string;
  email: string;
  phone: string;
  experience: string;
  bio: string;
  avatar: string;
  studentsCount: number;
  activeGroupsCount: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info';
}

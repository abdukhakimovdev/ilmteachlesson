import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';

// Layout & Common Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';
import { CommandPalette } from './components/common/CommandPalette';

// Modals
import { StudentProfileModal } from './components/modals/StudentProfileModal';
import { AddStudentModal } from './components/modals/AddStudentModal';
import { CreateLessonModal } from './components/modals/CreateLessonModal';
import { RecordPaymentModal } from './components/modals/RecordPaymentModal';
import { CreateHomeworkModal } from './components/modals/CreateHomeworkModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { LessonsPage } from './pages/LessonsPage';
import { AttendancePage } from './pages/AttendancePage';
import { HomeworkPage } from './pages/HomeworkPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ProgressPage } from './pages/ProgressPage';
import { ReportsPage } from './pages/ReportsPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { CalendarPage } from './pages/CalendarPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Student } from './types';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const {
    currentPage,
    selectedStudent,
    closeStudentProfile,
    quickModal,
    closeQuickModal,
  } = useApp();

  const [authView, setAuthView] = useState<'landing' | 'login'>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  // If not authenticated, toggle between Landing Page and Login Page
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <LoginPage onBackToLanding={() => setAuthView('landing')} />;
    }
    return <LandingPage onGoToLogin={() => setAuthView('login')} />;
  }

  // Active Page renderer
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'students':
        return <StudentsPage />;
      case 'lessons':
        return <LessonsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'homework':
        return <HomeworkPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'progress':
        return <ProgressPage />;
      case 'reports':
        return <ReportsPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleMobileNav={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* Student Profile Drawer / Modal */}
      <StudentProfileModal
        student={selectedStudent}
        onClose={closeStudentProfile}
        onEdit={(s) => {
          setStudentToEdit(s);
        }}
      />

      {/* Quick Modals from Quick Actions & Command Palette */}
      <AddStudentModal
        isOpen={quickModal === 'add-student' || studentToEdit !== null}
        studentToEdit={studentToEdit}
        onClose={() => {
          closeQuickModal();
          setStudentToEdit(null);
        }}
      />

      <CreateLessonModal
        isOpen={quickModal === 'create-lesson'}
        onClose={closeQuickModal}
      />

      <RecordPaymentModal
        isOpen={quickModal === 'record-payment'}
        onClose={closeQuickModal}
      />

      <CreateHomeworkModal
        isOpen={quickModal === 'assign-homework'}
        onClose={closeQuickModal}
      />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <MainAppContent />
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

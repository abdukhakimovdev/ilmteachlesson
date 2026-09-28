import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Language, ThemeMode } from '../types';
import {
  User,
  Palette,
  Globe,
  Bell,
  Shield,
  Database,
  Save,
  Download,
  RotateCcw,
  Check,
} from 'lucide-react';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';

export const SettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { currentUser, updateProfile } = useAuth();
  const { students, lessons, homeworkList, payments, resetToDemoData, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'appearance' | 'language' | 'notifications' | 'security' | 'data'
  >('profile');

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [subject, setSubject] = useState(currentUser.subject);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [bio, setBio] = useState(currentUser.bio);

  const [notifReminders, setNotifReminders] = useState(true);
  const [notifHomework, setNotifHomework] = useState(true);
  const [notifPayments, setNotifPayments] = useState(true);

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, subject, email, phone, bio });
    addToast(t.settings.successSaved, 'Teacher profile information updated.');
  };

  const handleExportData = () => {
    const exportBundle = {
      teacher: currentUser,
      exportDate: new Date().toISOString(),
      students,
      lessons,
      homeworkList,
      payments,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Teacher_OS_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Data Exported', 'Full JSON database downloaded.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {t.settings.title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Settings Tabs & Panel Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left: Tab Buttons */}
        <div className="space-y-1">
          {[
            { id: 'profile', label: t.settings.tabProfile, icon: User },
            { id: 'appearance', label: t.settings.tabAppearance, icon: Palette },
            { id: 'language', label: t.settings.tabLanguage, icon: Globe },
            { id: 'notifications', label: t.settings.tabNotifications, icon: Bell },
            { id: 'security', label: t.settings.tabSecurity, icon: Shield },
            { id: 'data', label: t.settings.tabData, icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Tab Content Container */}
        <div className="md:col-span-3 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{currentUser.role} · {currentUser.subject}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.settings.profileName}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.settings.profileSubject}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.settings.profileEmail}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {t.settings.profilePhone}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  {t.settings.profileBio}
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.settings.saveChanges}</span>
                </button>
              </div>
            </form>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                {t.settings.themeTitle}
              </h3>
              <p className="text-xs text-neutral-500">
                Choose the visual contrast that suits your teaching environment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      theme === mode
                        ? 'border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white capitalize block">
                      {mode === 'light'
                        ? t.settings.themeLight
                        : mode === 'dark'
                        ? t.settings.themeDark
                        : t.settings.themeSystem}
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      {mode === 'light' ? 'Bright clean UI' : mode === 'dark' ? 'Eye-comfort dark' : 'Follow OS'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LANGUAGE TAB */}
          {activeTab === 'language' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                {t.settings.languageTitle}
              </h3>
              <p className="text-xs text-neutral-500">
                Teacher OS is fully localized in three official languages.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'uz', name: 'O‘zbekcha', label: 'Lotin alifbosi (Standart)' },
                  { id: 'ru', name: 'Русский', label: 'Полный перевод интерфейса' },
                  { id: 'en', name: 'English', label: 'International standard' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLanguage(item.id as Language)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      language === item.id
                        ? 'border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                {t.settings.tabNotifications}
              </h3>
              <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Lesson reminders (30 mins before)
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Alerts for room number, group and lesson start
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifReminders}
                    onChange={(e) => setNotifReminders(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Homework submission alerts
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Notify immediately when a student submits homework
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifHomework}
                    onChange={(e) => setNotifHomework(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Tuition payment due notices
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Daily digest of overdue and pending student fees
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifPayments}
                    onChange={(e) => setNotifPayments(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                {t.settings.tabSecurity}
              </h3>
              <p className="text-xs text-neutral-500">
                Keep your teacher credentials and student records protected.
              </p>

              <div className="space-y-3 pt-2 max-w-sm">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    defaultValue="demo123"
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new strong password"
                    className="w-full px-3.5 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => addToast('Security Updated', 'Password successfully changed.')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                  {t.settings.tabData}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Export your complete classroom database or reset to clean demo records.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {t.settings.exportData}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Download all students, grades, lessons and payments as JSON.
                  </p>
                </div>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-red-600 dark:text-red-400">
                    {t.settings.resetData}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Restores 21 realistic Uzbek students, lessons, and demo financial data.
                  </p>
                </div>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.settings.resetData}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showResetConfirm}
        title={t.settings.resetData}
        description={t.settings.resetConfirm}
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={() => {
          resetToDemoData();
          setShowResetConfirm(false);
        }}
      />
    </div>
  );
};

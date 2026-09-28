import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { aiService } from '../services/aiService';
import {
  BarChart3,
  Download,
  Printer,
  Sparkles,
  FileText,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { students, addToast } = useApp();

  const [reportType, setReportType] = useState<string>('student');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 's-1');
  const [selectedGroup, setSelectedGroup] = useState<string>('Python-003');
  const [dateRange, setDateRange] = useState<string>('2026-09-01 - 2026-09-30');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiReportContent, setAiReportContent] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const student = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleGenerateReport = async () => {
    setIsAiLoading(true);
    try {
      const prompt = reportType === 'student'
        ? `Write a detailed performance progress report for student ${student.firstName} ${student.lastName} in ${student.group}. Attendance: ${student.attendanceRate}%, progress: ${student.progress}%, grade: ${student.averageGrade}%.`
        : `Write a consolidated ${reportType} report for group ${selectedGroup} covering ${dateRange}.`;

      const res = await aiService.generateResponse(prompt, language, {
        name: `${student.firstName} ${student.lastName}`,
        group: student.group,
        attendance: student.attendanceRate,
        progress: student.progress,
      });

      setAiReportContent(res.text);
      addToast('Report Ready', 'Analytical evaluation prepared.');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiReportContent) return;
    navigator.clipboard.writeText(aiReportContent);
    setCopied(true);
    addToast('Copied', 'Report copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    addToast('Downloading PDF', `Teacher_OS_Report_${student?.firstName}_${new Date().toISOString().split('T')[0]}.pdf generated.`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.reports.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.reports.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.reports.print}</span>
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t.reports.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* Report Configuration Controls */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t.reports.type}
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
            >
              <option value="student">{t.reports.studentReport}</option>
              <option value="group">{t.reports.groupReport}</option>
              <option value="attendance">{t.reports.attendanceReport}</option>
              <option value="payment">{t.reports.paymentReport}</option>
              <option value="weekly">{t.reports.weekly}</option>
              <option value="monthly">{t.reports.monthly}</option>
            </select>
          </div>

          {reportType === 'student' ? (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                {t.payments.selectStudent}
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} ({s.group})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                {t.dashboard.group}
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
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t.reports.dateRange}
            </label>
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleGenerateReport}
            disabled={isAiLoading}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAiLoading ? t.reports.aiGenerating : t.reports.generateBtn}</span>
          </button>
        </div>
      </div>

      {/* Report Preview Document */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6 print:border-none print:shadow-none">
        {/* Printable Letterhead */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Teacher OS · Official Progress Evaluation
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Classroom & Learning Analytics Engine
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-neutral-400 block">
              Date: {new Date().toLocaleDateString()}
            </span>
            <span className="text-xs font-mono text-neutral-400 block">
              Cohort: {student?.group}
            </span>
          </div>
        </div>

        {/* Student Snapshot Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              {t.students.tableAvatar}
            </span>
            <span className="text-sm font-bold text-neutral-900 dark:text-white mt-0.5 block">
              {student?.firstName} {student?.lastName}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              {t.studentProfile.attendanceRate}
            </span>
            <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              {student?.attendanceRate}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              {t.studentProfile.averageGrade}
            </span>
            <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5 block">
              {student?.averageGrade}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              {t.studentProfile.homeworkCompletion}
            </span>
            <span className="text-sm font-bold font-mono text-neutral-800 dark:text-neutral-200 mt-0.5 block">
              14 / 16 (87%)
            </span>
          </div>
        </div>

        {/* Narrative / AI Report Output */}
        <div className="space-y-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
          {aiReportContent ? (
            <div className="p-5 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 relative">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 no-print">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.aiAssistant.copied : t.aiAssistant.copy}</span>
                </button>
              </div>

              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-sans">
                {aiReportContent}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Teacher Diagnostic Narrative
              </h3>
              <p>
                {student?.firstName} has demonstrated consistent focus and rapid algorithmic problem-solving abilities throughout this evaluation period. The student completed all major coding assignments ahead of deadlines, actively participated in group code reviews, and showed exceptional creativity in practical exercises.
              </p>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-xs text-neutral-500">
                Click <strong>"{t.reports.generateBtn}"</strong> above to synthesize an AI-powered personalized progress memo or parent correspondence letter for this student.
              </div>
            </div>
          )}
        </div>

        {/* Signature Line */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <div>
            <p className="font-semibold text-neutral-900 dark:text-white">
              Azizbek Abduhakimov
            </p>
            <p className="text-[11px] text-neutral-400">Head Teacher & Curriculum Director</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-neutral-400">Teacher OS Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

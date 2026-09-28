import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Sparkles,
  UserCheck,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  Play,
} from 'lucide-react';
import { Language } from '../types';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { loginDemo } = useAuth();

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const testimonials = [
    {
      name: 'Nodira Qosimova',
      role: 'IT & Robotics Teacher, Tashkent',
      quote:
        'Teacher OS changed my entire morning routine. Taking attendance takes 20 seconds, and the AI lesson plan generator gives me fresh creative exercises for every class.',
      rating: 5,
    },
    {
      name: 'Timur Karimov',
      role: 'Private Mathematics Tutor',
      quote:
        'Tracking tuition in UZS with overdue payment alerts prevented 4 awkward parent follow-ups this month. Everything is transparent and polite.',
      rating: 5,
    },
    {
      name: 'Elena Smirnova',
      role: 'English B1/B2 Instructor',
      quote:
        'The student profile view allows me to show parents instant progress charts during our monthly parent consultations. Absolute lifesaver.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* 1. Universal Top Bar Contract (Brand, Links, Actions) */}
      <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 sm:px-12 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white">
            Teacher OS
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {t.landing.featuresTitle}
          </a>
          <a href="#ai" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {t.nav.aiAssistant}
          </a>
          <a href="#pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {t.landing.pricingTitle}
          </a>
          <a href="#faq" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            {t.landing.faqTitle}
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Lang Selector */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60">
            {(['uz', 'ru', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded transition-all ${
                  language === lang
                    ? 'bg-white dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onGoToLogin}
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            {t.landing.loginNav}
          </button>

          <button
            onClick={loginDemo}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.landing.exploreDemo}</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative px-6 sm:px-12 pt-16 sm:pt-24 pb-16 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.landing.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-4xl mx-auto leading-tight" style={{ textWrap: 'balance' }}>
          {t.landing.heroTitle}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {t.landing.heroDesc}
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
          <button
            onClick={loginDemo}
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.landing.exploreDemo}</span>
          </button>

          <button
            onClick={onGoToLogin}
            className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-850 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            <span>{t.landing.startFree}</span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Claim-to-Proof Numbers */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs text-neutral-500 font-medium">
          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            <span className="font-bold font-mono text-neutral-900 dark:text-white text-base block">1,200+</span>
            <span>{t.landing.statsTeachers}</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            <span className="font-bold font-mono text-neutral-900 dark:text-white text-base block">8+ hrs</span>
            <span>{t.landing.statsHours}</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            <span className="font-bold font-mono text-neutral-900 dark:text-white text-base block">99.4%</span>
            <span>{t.landing.statsSatisfaction}</span>
          </div>
        </div>

        {/* Hero Visual Asset */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-neutral-900">
            <img
              src="/src/assets/images/hero_teacher_dashboard_1790572843338.jpg"
              alt="Teacher OS Modern Classroom Dashboard"
              referrerPolicy="no-referrer"
              className="w-full object-cover max-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10 text-left">
              <div className="text-white max-w-lg">
                <span className="text-xs uppercase tracking-wider font-mono text-indigo-300 block mb-1">
                  Intelligent Classroom OS
                </span>
                <p className="text-base sm:text-xl font-bold leading-snug">
                  "Designed for modern teachers who value clarity over clutter."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Bento Section */}
      <section id="features" className="px-6 sm:px-12 py-16 sm:py-24 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t.landing.featuresTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
            {t.landing.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1: Rapid Attendance */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t.landing.f1Title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.landing.f1Desc}
            </p>
            <div className="pt-2">
              <img
                src="/src/assets/images/feature_classroom_collaboration_1790572873263.jpg"
                alt="Classroom Collaboration"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-xl border border-neutral-100 dark:border-neutral-800"
              />
            </div>
          </div>

          {/* Feature 2: AI Teaching Assistant */}
          <div id="ai" className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t.landing.f2Title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.landing.f2Desc}
            </p>
            <div className="pt-2">
              <img
                src="/src/assets/images/feature_ai_assistant_tablet_1790572885068.jpg"
                alt="AI Teaching Assistant on Tablet"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover rounded-xl border border-neutral-100 dark:border-neutral-800"
              />
            </div>
          </div>

          {/* Feature 3: Financial & Tuition */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t.landing.f3Title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.landing.f3Desc}
            </p>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span>Ali Karimov (Python-003)</span>
                <span className="text-emerald-600 font-bold">650,000 UZS · Paid</span>
              </div>
              <div className="flex justify-between">
                <span>Sardorbek Rahimov (Robotics-01)</span>
                <span className="text-red-500 font-bold">750,000 UZS · Overdue</span>
              </div>
            </div>
          </div>

          {/* Feature 4: Progress Analytics */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {t.landing.f4Title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.landing.f4Desc}
            </p>
            <div className="space-y-2 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Python Conditionals</span>
                  <span className="font-mono">88%</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[88%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Loops & Algorithms</span>
                  <span className="font-mono">81%</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-violet-600 h-full w-[81%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="px-6 sm:px-12 py-16 bg-neutral-100/60 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Trusted by 1,200+ Educators in Uzbekistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-3"
              >
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <h4 className="font-bold text-xs text-neutral-900 dark:text-white">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-neutral-400">{item.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing Architecture Section */}
      <section id="pricing" className="px-6 sm:px-12 py-16 sm:py-24 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {t.landing.pricingTitle}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
            {t.landing.pricingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                {t.landing.freePlan}
              </h3>
              <p className="text-xs text-neutral-500">{t.landing.freeDesc}</p>
              <div className="pt-2">
                <span className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                  {t.landing.freePrice}
                </span>
                <span className="text-xs text-neutral-400 ml-1">{t.landing.freePeriod}</span>
              </div>

              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Up to 20 students enrolled</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Rapid 1-click Attendance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Tuition payment tracking in UZS</span>
                </li>
              </ul>
            </div>

            <button
              onClick={loginDemo}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-indigo-600 shadow-lg flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
              Most Popular
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                {t.landing.proPlan}
              </h3>
              <p className="text-xs text-neutral-500">{t.landing.proDesc}</p>
              <div className="pt-2">
                <span className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                  {t.landing.proPrice}
                </span>
                <span className="text-xs text-neutral-400 ml-1">{t.landing.proPeriod}</span>
              </div>

              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Unlimited students & groups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>AI Teaching Assistant (Lesson plans, Quizzes)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Automated AI Parent Progress Reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>PDF analytics export & backup</span>
                </li>
              </ul>
            </div>

            <button
              onClick={loginDemo}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              Start 14-Day Free Pro Trial
            </button>
          </div>

          {/* School Plan */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-neutral-900 dark:text-white">
                {t.landing.schoolPlan}
              </h3>
              <p className="text-xs text-neutral-500">{t.landing.schoolDesc}</p>
              <div className="pt-2">
                <span className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                  {t.landing.schoolPrice}
                </span>
                <span className="text-xs text-neutral-400 ml-1">{t.landing.schoolPeriod}</span>
              </div>

              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Multi-teacher administrative panel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Consolidated learning center finance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dedicated curriculum engineering support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={loginDemo}
              className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Contact Enterprise
            </button>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faq" className="px-6 sm:px-12 py-16 max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {t.landing.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {[
            { q: t.landing.q1, a: t.landing.a1 },
            { q: t.landing.q2, a: t.landing.a2 },
            {
              q: 'Can I export all student data anytime?',
              a: 'Yes, full JSON database exports can be performed with one click in the Settings tab.',
            },
            {
              q: 'Does it work seamlessly on mobile phones and tablets?',
              a: 'Yes, Teacher OS is built with mobile-first responsiveness so you can take attendance and review homework on any smartphone or tablet.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 cursor-pointer"
              onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    faqOpen === idx ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {faqOpen === idx && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="px-6 sm:px-12 py-10 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">Teacher OS</span>
            <span>·</span>
            <span>{t.tagline}</span>
          </div>

          <div>
            © {new Date().getFullYear()} Teacher OS. {t.landing.footerRights}
          </div>
        </div>
      </footer>
    </div>
  );
};

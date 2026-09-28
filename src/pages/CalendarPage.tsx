import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { CalendarEvent } from '../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileCheck2,
  CreditCard,
  Plus,
  Clock,
  MapPin,
  X,
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { t } = useLanguage();
  const { calendarEvents, lessons } = useApp();

  const [currentDate, setCurrentDate] = useState(new Date('2026-09-28'));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const getEventBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lesson':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'homework':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'payment':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'event':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
    }
  };

  // Calendar dates generation (September 2026)
  const daysInMonth = 30; // September has 30 days
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-09-${dayNum.toString().padStart(2, '0')}`;
    const dayEvents = calendarEvents.filter((e) => e.date === dateStr);
    return { dayNum, dateStr, events: dayEvents };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.calendar.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.calendar.subtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{t.calendar.legendLesson}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{t.calendar.legendHomework}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-neutral-600 dark:text-neutral-400">{t.calendar.legendPayment}</span>
          </div>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">
            September 2026
          </h3>
          <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-semibold">
            {t.calendar.today}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Month Grid */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-2xs">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-center py-2.5 text-xs font-semibold text-neutral-500">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-neutral-100 dark:divide-neutral-800 min-h-[500px]">
          {/* Day 1 starts on Tuesday in Sep 2026 */}
          <div className="p-2 bg-neutral-50/30 dark:bg-neutral-900/30 min-h-[90px]" />

          {calendarDays.map((day) => {
            const isToday = day.dateStr === '2026-09-28';
            return (
              <div
                key={day.dayNum}
                className={`p-2 min-h-[100px] flex flex-col justify-between transition-colors ${
                  isToday ? 'bg-indigo-50/20 dark:bg-indigo-950/20' : 'hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-xs font-mono font-semibold ${
                      isToday
                        ? 'w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold'
                        : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {day.dayNum}
                  </span>
                </div>

                <div className="space-y-1 flex-1">
                  {day.events.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`w-full text-left p-1 rounded-md text-[10px] sm:text-[11px] font-semibold border leading-tight truncate block transition-all hover:scale-[1.02] cursor-pointer ${getEventBadge(
                        ev.type
                      )}`}
                    >
                      {ev.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setSelectedEvent(null)} />
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase border ${getEventBadge(
                    selectedEvent.type
                  )}`}
                >
                  {selectedEvent.type}
                </span>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white mt-2">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-neutral-400" />
                <span>Date: {selectedEvent.date}</span>
              </div>
              {selectedEvent.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>Time: {selectedEvent.time}</span>
                </div>
              )}
              {selectedEvent.group && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Group:
                  </span>
                  <span>{selectedEvent.group}</span>
                </div>
              )}
              {selectedEvent.details && (
                <p className="mt-2 p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl leading-relaxed">
                  {selectedEvent.details}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

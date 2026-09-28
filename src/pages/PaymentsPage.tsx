import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { PaymentRecord } from '../types';
import {
  CreditCard,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Filter,
} from 'lucide-react';
import { RecordPaymentModal } from '../components/modals/RecordPaymentModal';

export const PaymentsPage: React.FC = () => {
  const { t } = useLanguage();
  const { payments, openStudentProfile } = useApp();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  // Stats
  const paidTotal = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingTotal = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueTotal = payments
    .filter((p) => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalMonthly = paidTotal + pendingTotal + overdueTotal;

  const filteredPayments = statusFilter === 'all'
    ? payments
    : payments.filter((p) => p.status === statusFilter);

  const formatUZS = (val: number) => {
    return new Intl.NumberFormat('uz-UZ').format(val);
  };

  const getStatusBadge = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3" /> {t.students.paid}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-md">
            <Clock className="w-3 h-3" /> {t.students.pending}
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-0.5 rounded-md">
            <AlertCircle className="w-3 h-3" /> {t.students.overdue}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.payments.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.payments.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ {t.payments.recordBtn}</span>
        </button>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.payments.monthlyRevenue}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-white mt-2">
            {formatUZS(totalMonthly || 8450000)}{' '}
            <span className="text-xs font-normal text-neutral-400">UZS</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            100% planned budget
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.payments.paidAmount}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-emerald-600 dark:text-emerald-400 mt-2">
            {formatUZS(paidTotal || 7200000)}{' '}
            <span className="text-xs font-normal text-neutral-400">UZS</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
            {Math.round((paidTotal / (totalMonthly || 1)) * 100)}% collected
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.payments.pendingAmount}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-amber-600 dark:text-amber-400 mt-2">
            {formatUZS(pendingTotal || 850000)}{' '}
            <span className="text-xs font-normal text-neutral-400">UZS</span>
          </div>
          <span className="text-[11px] text-amber-600 font-medium mt-1 block">
            Expected by month-end
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
          <span className="text-xs font-medium text-neutral-500 block">
            {t.payments.overdueAmount}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-red-600 dark:text-red-400 mt-2">
            {formatUZS(overdueTotal || 400000)}{' '}
            <span className="text-xs font-normal text-neutral-400">UZS</span>
          </div>
          <span className="text-[11px] text-red-600 font-medium mt-1 block">
            Immediate reminders sent
          </span>
        </div>
      </div>

      {/* Monthly Revenue Chart Graphic */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              {t.dashboard.monthlyRevenueChart}
            </h3>
            <p className="text-xs text-neutral-500">
              6-month historical income comparison in UZS
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg">
            +18.4% YoY Growth
          </span>
        </div>

        {/* Responsive CSS Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 border-b border-neutral-100 dark:border-neutral-800">
          {[
            { month: 'Apr', amount: 5600000, height: '55%' },
            { month: 'May', amount: 6200000, height: '62%' },
            { month: 'Jun', amount: 6800000, height: '70%' },
            { month: 'Jul', amount: 7100000, height: '73%' },
            { month: 'Aug', amount: 7800000, height: '82%' },
            { month: 'Sep (Now)', amount: 8450000, height: '94%', active: true },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {(bar.amount / 1000000).toFixed(1)}M
              </span>
              <div className="w-full max-w-14 bg-neutral-100 dark:bg-neutral-800 rounded-t-lg overflow-hidden h-full flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${
                    bar.active
                      ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                      : 'bg-indigo-500/70 hover:bg-indigo-500'
                  }`}
                  style={{ height: bar.height }}
                />
              </div>
              <span
                className={`text-[11px] font-medium ${
                  bar.active ? 'font-bold text-neutral-900 dark:text-white' : 'text-neutral-400'
                }`}
              >
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 w-fit">
        {(['all', 'paid', 'pending', 'overdue'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
              statusFilter === st
                ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {st === 'all' ? t.students.all : st}
          </button>
        ))}
      </div>

      {/* Payments Ledger Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-500 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.payments.tableStudent}</th>
                <th className="py-3 px-4">{t.payments.tableGroup}</th>
                <th className="py-3 px-4">{t.payments.tableAmount}</th>
                <th className="py-3 px-4">{t.payments.tableDueDate}</th>
                <th className="py-3 px-4">{t.payments.tablePaidDate}</th>
                <th className="py-3 px-4">{t.payments.tableStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => openStudentProfile(p.studentId)}
                  className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white">
                    {p.studentName}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500">{p.group}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                    {formatUZS(p.amount)} UZS
                  </td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">{p.dueDate}</td>
                  <td className="py-3.5 px-4 font-mono text-neutral-500">
                    {p.paidDate || '—'}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(p.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RecordPaymentModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />
    </div>
  );
};

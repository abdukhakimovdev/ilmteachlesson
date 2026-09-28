import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { aiService, AiResponseResult } from '../services/aiService';
import { ChatMessage } from '../types';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  FileCheck2,
  Bookmark,
  User,
  Bot,
} from 'lucide-react';

export const AiAssistantPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast, addLesson, addHomework, setCurrentPage } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Assalomu alaykum! Men sizning intellektual o‘qituvchi yordamchingizman. 

Bugungi darsingiz uchun nima tayyorlashimiz kerak?
* 📝 **Dars rejasi:** 45 yoki 90 daqiqalik dars konspekti
* 📚 **Uyga vazifalar:** O‘quvchilar yoshiga mos qiziqarli masalalar
* 👨‍👩‍👦 **Ota-onalarga hisobot:** Xushmuomala xabarnoma xatlari
* ❓ **Viktorinalar:** Tezkor test savollari va javoblari`,
      timestamp: '09:00',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const response: AiResponseResult = await aiService.generateResponse(textToSend, language);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: response.category,
        topic: response.topic,
        codeSnippet: response.codeSnippet,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      addToast('Error', 'Could not generate response. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('Copied', 'Content copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseInLesson = (msg: ChatMessage) => {
    addLesson({
      title: msg.topic || 'AI Generated Lesson Topic',
      subject: 'Computer Science',
      group: 'Python-003',
      date: new Date().toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '11:30',
      room: '204',
      studentCount: 12,
      topic: msg.topic || 'Algorithmic Problem Solving',
      homework: 'Assigned via AI Assistant',
      status: 'upcoming',
      notes: msg.text.substring(0, 200),
    });
    addToast('Added to Lessons', 'Created lesson entry from this AI response.');
  };

  const handleAddToHomework = (msg: ChatMessage) => {
    addHomework({
      title: msg.topic || 'Python Practical Exercises',
      group: 'Python-003',
      assignedDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      difficulty: 'medium',
      description: msg.text.substring(0, 300),
      totalCount: 12,
    });
    addToast('Homework Assigned', 'Assignment created from AI generation.');
  };

  const promptSuggestions = [
    { label: t.aiAssistant.chipLessonPlan, prompt: t.aiAssistant.p3 },
    { label: t.aiAssistant.chipHomework, prompt: t.aiAssistant.p1 },
    { label: t.aiAssistant.chipParentReport, prompt: t.aiAssistant.p2 },
    { label: t.aiAssistant.chipQuiz, prompt: t.aiAssistant.p4 },
    { label: t.aiAssistant.chipAnalyze, prompt: t.aiAssistant.p5 },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            {t.aiAssistant.title}
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t.aiAssistant.subtitle}
          </p>
        </div>
      </div>

      {/* Suggested Prompts Shelf */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
        {promptSuggestions.map((item, i) => (
          <button
            key={i}
            onClick={() => handleSend(item.prompt)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-400 dark:hover:border-indigo-600 text-neutral-700 dark:text-neutral-200 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                    : 'bg-indigo-600 text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Box */}
              <div
                className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 ${
                  isUser
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-tr-none'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs rounded-tl-none text-neutral-800 dark:text-neutral-200'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text}
                </div>

                {/* Code Snippet Box if available */}
                {msg.codeSnippet && (
                  <div className="mt-3 p-3 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800">
                    <pre>{msg.codeSnippet}</pre>
                  </div>
                )}

                {/* Assistant Action Bar (Copy, Use in Lesson, Add to Homework) */}
                {!isUser && (
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 flex-wrap text-xs">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === msg.id ? t.aiAssistant.copied : t.aiAssistant.copy}</span>
                    </button>

                    <button
                      onClick={() => handleUseInLesson(msg)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t.aiAssistant.useInLesson}</span>
                    </button>

                    <button
                      onClick={() => handleAddToHomework(msg)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>+ {t.nav.homework}</span>
                    </button>
                  </div>
                )}

                <div className="text-[10px] text-neutral-400 text-right font-mono">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-3xl">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>{t.reports.aiGenerating}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.aiAssistant.inputPlaceholder}
            className="flex-1 px-4 py-2 text-xs sm:text-sm bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 rounded-xl transition-colors cursor-pointer"
          >
            <span>{t.aiAssistant.send}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

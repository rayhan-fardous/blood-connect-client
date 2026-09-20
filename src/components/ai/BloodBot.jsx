'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HeartHandshake,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

const QUICK_PROMPTS = [
  '🩺 Am I eligible to donate blood?',
  '🧬 Who can receive B+ blood?',
  '🚨 Emergency: How do I find donors fast?',
  '🇧🇩 রক্তদানের যোগ্যতা ও শর্তাবলী কী কী?',
];

export default function BloodBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: '👋 Hello! I am **BloodConnect AI (রক্তবন্ধু)**.\n\nI can help you with:\n- 🩺 Checking your **donor eligibility** (weight, interval, medications)\n- 🧬 **Blood compatibility** (ABO & Rh matching)\n- 🚨 Emergency guidance in **English** or **বাংলা**\n\nHow can I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || isLoading) return;

    const newMessages = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/bloodbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to get response');
      }

      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: '⚠️ Sorry, I encountered an issue connecting to AI services. Please check your internet or try again shortly.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'model',
        text: '👋 Chat cleared! How can I assist you with blood donation today?',
      },
    ]);
  };

  // Simple formatter for bullet points and bold markdown
  const renderMessageContent = (content) => {
    return content.split('\n').map((line, idx) => {
      // Replace **bold** with <strong>
      const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const isBullet = line.trim().startsWith('-');

      if (isBullet) {
        return (
          <li
            key={idx}
            className="ml-4 list-disc text-xs sm:text-sm my-0.5"
            dangerouslySetInnerHTML={{ __html: boldFormatted.replace(/^-+\s*/, '') }}
          />
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p
          key={idx}
          className="text-xs sm:text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldFormatted }}
        />
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          aria-label="Open AI BloodBot Assistant"
        >
          {/* Subtle Radar Pulse */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
          </span>

          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>

          <div className="text-left pr-1">
            <span className="text-xs font-bold block leading-tight flex items-center gap-1">
              BloodBot AI
              <Sparkles size={11} className="text-amber-300" />
            </span>
            <span className="text-[10px] text-red-100 font-medium leading-none">রক্তবন্ধু Advisor</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] md:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center">
                  <Bot size={20} className="text-red-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  BloodConnect AI
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/30 text-red-200 font-normal">
                    রক্তবন্ধু
                  </span>
                </h4>
                <p className="text-[11px] text-slate-300">24/7 Medical Triage & Eligibility</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Reset Chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Close Window"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={15} className="text-red-600" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-xs shadow-sm'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {renderMessageContent(msg.text)}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={14} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Quick Prompts on initial conversation */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  Suggested Questions
                </p>
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs bg-white hover:bg-red-50/60 border border-slate-200 hover:border-red-200 p-2 rounded-xl text-slate-700 transition-colors flex items-center justify-between group shadow-2xs"
                  >
                    <span>{prompt}</span>
                    <ChevronRight size={13} className="text-slate-400 group-hover:text-red-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-1">
                <div className="w-7 h-7 rounded-full bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
                  <Bot size={15} className="text-red-600" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-400 ml-1">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English or বাংলা..."
                disabled={isLoading}
                className="flex-1 bg-slate-100/80 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
                title="Send Message"
              >
                <Send size={15} />
              </button>
            </form>

            <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
              <ShieldCheck size={11} className="text-emerald-600" />
              <span>WHO & DGHS clinical guidelines. Always consult hospital medical staff.</span>
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

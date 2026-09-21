'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ArrowLeft,
  Lock,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    essential: true, // Always locked to true
    preferences: true,
    analytics: false,
  });

  const handleToggle = (key) => {
    if (key === 'essential') return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success('Your cookie preferences have been updated and saved.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 overflow-hidden relative">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-12 left-1/3 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70 mb-4 shadow-xs">
            <Cookie size={14} className="text-red-500" />
            Browser Data & Controls
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Cookie Settings & Policy
          </h1>
          <p className="text-sm text-slate-500">
            Control how cookies and local storage are utilized to personalize and secure your BloodConnect experience.
          </p>
        </div>

        {/* INTERACTIVE PREFERENCE CONTROL CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sliders size={20} className="text-red-600" />
                Customize Cookie Preferences
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Toggle optional cookies. Essential cookies cannot be disabled as they are required for account security.
              </p>
            </div>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 transition-all shrink-0"
            >
              Save Preferences
            </button>
          </div>

          <div className="space-y-6">
            {/* Essential */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    Strictly Necessary Cookies
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 font-bold text-[10px] uppercase">
                    Always Active
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  Crucial for core functionality, such as keeping you authenticated with Better Auth, CSRF protection, and securely verifying donation requests.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Lock size={16} />
                Required
              </div>
            </div>

            {/* Functional / Preferences */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    Functional & Region Preferences
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  Remembers your recently filtered district and upazila on the search pages so you do not have to select them repeatedly during emergencies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('preferences')}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  preferences.preferences ? 'bg-red-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>

            {/* Analytics */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    Performance & Diagnostic Metrics
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  Anonymously aggregates API response latencies and errors to help our volunteer engineering team prevent platform crashes during high traffic surges.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('analytics')}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  preferences.analytics ? 'bg-red-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* POLICY EXPLANATION CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            What Are Cookies & How Does BloodConnect Use Them?
          </h2>
          <p>
            Cookies are compact text files stored on your computer or mobile device when you access websites. BloodConnect uses cookies and browser local storage strictly to ensure uninterrupted, secure platform functionality during emergency situations.
          </p>
          <p>
            We do <strong>not</strong> partner with commercial advertising networks or place third-party behavioral tracking cookies on your device.
          </p>

          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Managing Cookies in Your Browser</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              You can block or delete cookies via your browser settings (Chrome, Safari, Firefox, or Edge). Note that disabling essential cookies will prevent you from signing in to your donor or requester dashboard.
            </p>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-red-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-red-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-red-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

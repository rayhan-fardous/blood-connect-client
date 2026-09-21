'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  AlertTriangle,
  Heart,
  Scale,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 overflow-hidden relative">
      {/* Soft Glow Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70 mb-4 shadow-xs">
            <Scale size={14} className="text-red-500" />
            Terms of Use & Code of Conduct
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Effective Date: September 2026 • Governing laws of the People’s Republic of Bangladesh
          </p>
        </div>

        {/* IMPORTANT NOTICE BANNER */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl sm:rounded-3xl p-6 mb-10 text-amber-900 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
            <h4 className="font-bold text-amber-950">Strict Prohibition Against Commercial Blood Sales</h4>
            <p>
              Under the Safe Blood Transfusion Act of Bangladesh, buying, selling, or brokering blood for financial remuneration is a punishable criminal offense. BloodConnect is strictly voluntary. Any user requesting money or offering paid blood will be immediately banned and reported.
            </p>
          </div>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or registering on BloodConnect, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree, please discontinue using the platform immediately.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              2. Platform Nature & Medical Disclaimer
            </h2>
            <p>
              BloodConnect is a communications technology platform designed to connect voluntary blood donors with individuals in need of urgent transfusions.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-600">
              <p>
                <strong>BloodConnect is NOT a hospital, blood bank, laboratory, or healthcare clinic.</strong>
              </p>
              <p>
                We do not perform medical procedures, cross-matching, infectious disease screening, or physical storage of blood units. All testing, blood compatibility cross-matching, screening for TTIs (Transfusion Transmitted Infections), and transfusions must be executed by licensed medical doctors and certified hospital blood banks.
              </p>
            </div>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              3. Donor Responsibilities & Code of Conduct
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>You agree to provide true, accurate, and current information regarding your blood group and health status.</li>
              <li>You confirm that your donation is purely altruistic and voluntary. You shall never demand, accept, or solicit financial compensation.</li>
              <li>If you become aware of any condition rendering you ineligible (fever, antibiotics, recent infection), you agree to notify the recipient or mark your profile as unavailable.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              4. Recipient & Requester Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>You agree to post genuine medical blood requisitions supported by official hospital requisition slips upon request.</li>
              <li>You agree to treat voluntary donors with utmost dignity, respect, and gratitude.</li>
              <li>You agree to never use donor telephone numbers or identities for non-emergency or commercial solicitations.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable laws of Bangladesh, BloodConnect, its founders, volunteers, and contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from donor absence, delayed responses, medical complications during hospital transfusions, or transmission errors.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              6. Account Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate any user account immediately without prior notice if we detect suspicious activity, false requisitions, harassment, commercial brokering, or any violation of these terms.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              7. Governing Law
            </h2>
            <p>
              These Terms shall be construed and governed in accordance with the laws of the People’s Republic of Bangladesh, with exclusive jurisdiction resting in the courts of Dhaka.
            </p>
          </section>

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
            <Link href="/cookies" className="hover:text-red-600 transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  Heart,
  CheckCircle2,
  Mail,
  ArrowLeft,
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 overflow-hidden relative">
      {/* Soft Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70 mb-4 shadow-xs">
            <ShieldCheck size={14} className="text-red-500" />
            Data Protection & Trust
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: September 2026 • Applies to all BloodConnect users across Bangladesh
          </p>
        </div>

        {/* HIGHLIGHT BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <EyeOff size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Zero Data Selling</h4>
              <p className="text-xs text-slate-500 mt-0.5">We will never sell or monetize your personal or health data.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Lock size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">End-to-End Security</h4>
              <p className="text-xs text-slate-500 mt-0.5">Encrypted transmission and restricted database access protocols.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Donor Control</h4>
              <p className="text-xs text-slate-500 mt-0.5">You can update availability or delete your profile at any time.</p>
            </div>
          </div>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              1. Introduction & Our Humanitarian Commitment
            </h2>
            <p>
              BloodConnect (&quot;we,&quot; &quot;our,&quot; or &quot;the platform&quot;) operates as a free, open-source humanitarian service dedicated to connecting voluntary blood donors with patients in urgent medical need across Bangladesh. We recognize that medical and contact details are profoundly sensitive. This Privacy Policy details how we collect, safeguard, and disclose information responsibly.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              2. Information We Collect
            </h2>
            <p>We collect only the minimum necessary information required to coordinate emergency blood transfusions safely:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Identity Information:</strong> Full name, email address, password hashes (handled via Better Auth), and optional profile avatar.
              </li>
              <li>
                <strong>Medical & Donation Attributes:</strong> Blood group (e.g., A+, O-, B+), availability status, and general eligibility affirmations.
              </li>
              <li>
                <strong>Geographical Data:</strong> District and Upazila (used exclusively to match nearby patients with donors). We do not collect continuous background GPS location.
              </li>
              <li>
                <strong>Contact Information:</strong> Phone number (used to coordinate vital communication during emergency matches).
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              3. How We Use Your Information
            </h2>
            <p>Your information is used strictly to fulfill the humanitarian mission of the platform:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>To match compatible blood donors with emergency requisition posts based on biological blood compatibility and geographic proximity.</li>
              <li>To dispatch real-time emergency notifications when a patient in your upazila urgently requires your blood group.</li>
              <li>To authenticate your session and prevent spam or malicious submissions.</li>
              <li>To compile non-identifiable, aggregated platform metrics (e.g., total lives saved, district coverage).</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              4. Emergency Phone Number Disclosure Policy
            </h2>
            <p>
              To protect our voluntary donors from unsolicited spam or harassment, donor phone numbers are never published as an open, downloadable public directory. Contact numbers are displayed only in the context of active, verified donation requests or direct recipient-donor coordination.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              5. Data Security & Storage
            </h2>
            <p>
              We implement industry-standard cryptographic safeguards. All web communications are transmitted over TLS 1.3 encryption. Passwords and credentials are cryptographically hashed, and database access is restricted via role-based authentication and secure cloud firewalls.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              6. Your Rights & Profile Management
            </h2>
            <p>You maintain complete ownership of your data on BloodConnect:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong>Toggle Availability:</strong> If you are temporarily unwell or unable to donate, you can update your status to unavailable in your dashboard.</li>
              <li><strong>Correction:</strong> You can edit your location, name, or phone number anytime from the Profile section.</li>
              <li><strong>Account Deletion:</strong> You may request complete erasure of your profile and donor records at any time.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              7. Contact Our Privacy Officer
            </h2>
            <p>
              If you have any questions, concerns, or data requests regarding this Privacy Policy, please reach out directly:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900">BloodConnect Data Protection Desk</p>
                <p className="text-xs text-slate-500">Banani, Dhaka-1213, Bangladesh</p>
              </div>
              <a
                href="mailto:privacy@bloodconnect.org"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                <Mail size={16} />
                privacy@bloodconnect.org
              </a>
            </div>
          </section>

        </div>

        {/* BOTTOM NAV */}
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-red-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-red-600 transition-colors">
              Terms of Service
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

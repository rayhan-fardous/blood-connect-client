"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";

export default function AccessDenied({ allowedRoles = [] }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-red-100 bg-white/70 p-8 text-center shadow-xl shadow-red-500/5 backdrop-blur-md md:p-12 animate-in fade-in zoom-in-95 duration-300">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm border border-red-100/50">
          <div className="absolute inset-0 rounded-2xl bg-red-500/10 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
          <Lock size={36} className="relative z-10 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
          Access Restricted
        </h2>
        
        <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          The requested panel directory lies outside your current authentication clearance level.
        </p>

        {allowedRoles.length > 0 && (
          <div className="mt-6 inline-flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Clearance Level Required
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {allowedRoles.map((role) => (
                <span
                  key={role}
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100/60 uppercase tracking-wide"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold tracking-wider uppercase transition-all hover:scale-102 active:scale-98 shadow-md shadow-slate-900/15"
          >
            <ArrowLeft size={14} />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

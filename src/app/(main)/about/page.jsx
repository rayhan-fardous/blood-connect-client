'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  ShieldCheck,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Droplet,
  MapPin,
  CheckCircle2,
  Activity,
  Award,
} from 'lucide-react';

const stats = [
  { label: 'Registered Donors', value: '12,500+', icon: Users, color: 'text-red-600 bg-red-50' },
  { label: 'Lives Impacted', value: '8,900+', icon: Heart, color: 'text-rose-600 bg-rose-50' },
  { label: 'Districts Covered', value: '64/64', icon: MapPin, color: 'text-amber-600 bg-amber-50' },
  { label: 'Average Response', value: '< 15 mins', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
];

const values = [
  {
    icon: Droplet,
    title: 'Every Drop Matters',
    desc: 'We believe access to safe blood is an unconditional human right. Our platform bridges the critical minutes between a medical emergency and a lifesaving transfusion.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Trust First',
    desc: 'All donors and requisitions undergo biological compatibility screening and verification to ensure maximum donor wellbeing and patient safety.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Powered by thousands of selfless volunteers and donors across every division and upazila of Bangladesh, united by compassion and urgency.',
  },
  {
    icon: Activity,
    title: '100% Free & Transparent',
    desc: 'No middleman charges, no hidden fees. BloodConnect operates with absolute financial transparency and zero commercial exploitation of human blood.',
  },
];

const milestones = [
  { year: '2023', title: 'The Spark', desc: 'Conceived after witnessing family members struggle to locate rare negative blood groups in Dhaka hospitals.' },
  { year: '2024', title: 'Nationwide Expansion', desc: 'Integrated 64 districts and 495 upazilas, launching smart biological compatibility algorithms.' },
  { year: '2025', title: 'AI-Powered Dispatch', desc: 'Introduced BloodBot and intelligent requisition matching to notify closest eligible donors within seconds.' },
  { year: 'Today', title: 'A Thriving Network', desc: 'Over 12,000 active heroes ready to answer calls day and night across Bangladesh.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 overflow-hidden relative">
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70 mb-5 shadow-xs">
            <Sparkles size={14} className="text-red-500" />
            Our Mission & Impact
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Bridging the gap between <br className="hidden sm:inline" />
            <span className="text-red-600">lifesavers</span> and patients in need.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            BloodConnect was established with a singular focus: to eliminate preventable deaths caused by the unavailability of compatible blood in critical moments across Bangladesh.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4 }}
                className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs text-center flex flex-col items-center"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* STORY / PURPOSE SPLIT SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                Why We Exist
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Minutes matter when a life is on the line.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In Bangladesh, an estimated 1.2 million units of blood are required annually for surgeries, cancer treatments, childbirth emergencies, and accident victims. Yet, thousands of families scramble in panic every day, calling friends or posting on social media networks.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                BloodConnect automates and organizes this fragmented ecosystem. By indexing donors by exact blood group, district, and upazila, our automated coordination alerts the nearest compatible donors instantly—cutting response times from harrowing hours to just minutes.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-red-600 shrink-0" />
                  Verified Donors
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-red-600 shrink-0" />
                  Real-Time Location Matching
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-red-600 shrink-0" />
                  Zero Commercial Fees
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-red-50 to-rose-100/60 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-red-100 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/30">
                  <Award size={20} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Our Uncompromising Pledge
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We pledge that BloodConnect will forever remain free for donors and recipients. We will never sell personal user health data or monetize emergency requests.
                </p>
              </div>

              <div className="border-t border-red-200/60 pt-4 flex items-center justify-between text-xs text-red-700 font-semibold">
                <span>Certified Humanitarian Initiative</span>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* CORE VALUES */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">Core Values</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-5 shrink-0">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* JOURNEY TIMELINE */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">Milestones</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              How Far We Have Come
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={m.year} className="relative pl-6 sm:pl-0 sm:pt-6 border-l-2 sm:border-l-0 sm:border-t-2 border-red-500/30">
                <span className="text-xs font-black text-red-600 uppercase tracking-wider">{m.year}</span>
                <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">{m.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white p-8 sm:p-12 text-center shadow-xl shadow-red-500/20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Save a Life Today?
            </h2>
            <p className="text-sm sm:text-base text-red-100 font-normal leading-relaxed">
              It takes just two minutes to join Bangladesh’s most reliable network of voluntary blood donors.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-red-600 font-bold text-sm shadow-md hover:bg-red-50 transition-all"
              >
                Join as a Donor
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/donation-requests"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-red-800/60 hover:bg-red-800 text-white border border-red-400/40 font-semibold text-sm transition-all"
              >
                View Urgent Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

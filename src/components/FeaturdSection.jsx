"use client";

import { useRef, useEffect, useState } from "react";
import { Activity, ShieldAlert, Heart, Trophy } from "lucide-react";

const coreFeatures = [
  {
    icon: Activity,
    badge: "Real-Time",
    title: "Hyper-Local Matching",
    desc: "Our intelligent routing system connects requests with nearby compatible donors in sub-second speeds during critical windows.",
    color: "from-amber-500 to-red-500",
    glow: "bg-red-500/[0.03]",
  },
  {
    icon: ShieldAlert,
    badge: "Encrypted",
    title: "Biometric & Data Trust",
    desc: "Medical requests and privacy details are guarded by end-to-end encryption, multi-factor verification, and zero-leak security.",
    color: "from-cyan-500 to-blue-600",
    glow: "bg-blue-500/[0.03]",
  },
  {
    icon: Heart,
    badge: "Impact",
    title: "The Next-Gen Network",
    desc: "Become part of an automated, highly responsive mutual-aid ecosystem designed to completely eliminate regional blood shortages.",
    color: "from-rose-500 to-fuchsia-600",
    glow: "bg-rose-500/[0.03]",
  },
  {
    icon: Trophy,
    badge: "Gamified",
    title: "Impact Rewards Tracker",
    desc: "Log your life-saving milestones, unlock community badges, track your physiological impact stats, and claim exclusive partner perks.",
    color: "from-violet-600 to-indigo-600",
    glow: "bg-violet-500/[0.03]",
  },
];

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 },
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-slate-50 text-slate-900 overflow-hidden select-none"
    >
      {/* Light Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-200 h-200 rounded-full bg-red-50/60 blur-[140px] animate-[pulse_12s_infinite]" />
        <div className="absolute bottom-1/4 -right-1/4 w-180 h-180 rounded-full bg-indigo-50/60 blur-[140px] animate-[pulse_16s_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div
          className={`max-w-3xl mb-24 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-red-50 text-red-600 border border-red-200/60 mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            Platform Architecture
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Engineering a safer <br />
            <span className="bg-linear-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              lifeline for everyone.
            </span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            We stripped away legacy friction and rebuilt the blood donation
            pipeline using intelligent automation, deep encryption, and
            real-time community scaling.
          </p>
        </div>

        {/* Features Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {coreFeatures.map((item, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 hover:border-slate-300 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 hover:shadow-xl hover:shadow-slate-200/60
                ${hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
              `}
            >
              {/* Internal Glowing Backplate on Hover */}
              <div
                className={`absolute inset-0 rounded-3xl ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />

              {/* Top Accent Tech Stripe */}
              <div
                className={`absolute top-0 left-8 right-8 h-0.5 bg-linear-to-r ${item.color} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Upper Row: Badge & Metadata */}
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`p-4 rounded-2xl bg-linear-to-br ${item.color} text-white shadow-md shadow-slate-200 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <item.icon size={24} strokeWidth={2} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  {item.badge}
                </span>
              </div>

              {/* Feature Copy */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {item.desc}
              </p>

              {/* Neo-minimalist Interactive Chevron */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                <span>SYSTEM STATUS</span>
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

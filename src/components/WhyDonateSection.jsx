"use client";

import { useEffect, useState, useRef } from "react";
import { Heart, Activity, Users, Stethoscope } from "lucide-react";

const coreReasons = [
  {
    icon: Heart,
    title: "Save Human Lives",
    desc: "Just one donation can save up to three lives. Your blood is the most precious gift you can give to someone in urgent need.",
    gradient: "from-amber-500 to-red-500",
    glow: "bg-red-500/[0.03]",
  },
  {
    icon: Activity,
    title: "Boost Your Health",
    desc: "Donating regularly helps balance your body’s iron levels, reduces the risk of heart disease, and stimulates fresh blood production.",
    gradient: "from-cyan-500 to-blue-600",
    glow: "bg-blue-500/[0.03]",
  },
  {
    icon: Users,
    title: "Help Your Community",
    desc: "Join a massive network of local heroes. Your contribution keeps hospital shelves stocked and strengthens everyone’s safety net.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-500/[0.03]",
  },
  {
    icon: Stethoscope,
    title: "Free Health Check-up",
    desc: "Get a complimentary mini-physical every time you donate. We check your blood pressure, hemoglobin, and screen for infections.",
    gradient: "from-violet-600 to-indigo-600",
    glow: "bg-violet-500/[0.03]",
  },
];

const statsData = [
  { label: "Lives Saved", target: 12480, suffix: "+" },
  { label: "Registered Donors", target: 8420, suffix: "+" },
  { label: "Successful Donations", target: 6300, suffix: "+" },
];

const WhyDonateSection = () => {
  const [counters, setCounters] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animationTriggered.current) {
          animationTriggered.current = true;

          statsData.forEach((stat, idx) => {
            const frames = 60;
            const step = stat.target / frames;
            let currentVal = 0;

            const timer = setInterval(() => {
              currentVal += step;
              if (currentVal >= stat.target) {
                currentVal = stat.target;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const updated = [...prev];
                updated[idx] = Math.floor(currentVal);
                return updated;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.15 },
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-slate-50 text-slate-900 overflow-hidden select-none"
    >
      {/* Soft Background Accent Globs */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -left-1/4 w-180 h-180 rounded-full bg-red-100/50 blur-[130px] animate-[pulse_10s_infinite]" />
        <div className="absolute bottom-1/4 -right-1/4 w-160 h-160 rounded-full bg-indigo-100/40 blur-[150px] animate-[pulse_14s_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-red-50 text-red-600 border border-red-200/60 mb-6 shadow-xs">
            <Heart size={14} className="animate-pulse text-red-500" />
            The Gift of Life
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Why should you <br />
            <span className="bg-linear-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              donate blood?
            </span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Every two seconds, someone needs blood. Your simple decision to
            donate can turn a medical emergency into a beautiful story of
            survival.
          </p>
        </div>

        {/* Reasons Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-16">
          {coreReasons.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 hover:border-slate-300 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-3 hover:shadow-xl hover:shadow-slate-200/60"
            >
              {/* Internal Hover Glow */}
              <div
                className={`absolute inset-0 rounded-3xl ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />

              {/* Top Card Accent Line */}
              <div
                className={`absolute top-0 left-8 right-8 h-0.5 bg-linear-to-r ${item.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Icon Container */}
              <div
                className={`w-14 h-14 mb-8 rounded-2xl bg-linear-to-br ${item.gradient} text-white shadow-md shadow-slate-200 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                <item.icon size={24} strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Numbers Board */}
        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-xl shadow-slate-200/40 relative">
          <div className="absolute top-0 left-16 right-16 h-0.5 bg-linear-to-r from-red-500 to-rose-500 opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {statsData.map((stat, idx) => (
              <div key={idx} className="space-y-2 flex flex-col justify-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-linear-to-r from-slate-900 via-red-950 to-slate-900 bg-clip-text text-transparent">
                  {counters[idx].toLocaleString()}
                  <span className="text-red-500">{stat.suffix}</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonateSection;

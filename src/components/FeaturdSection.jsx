"use client";

import { motion } from "framer-motion";
import { Activity, ShieldAlert, Heart, Trophy } from "lucide-react";

const coreFeatures = [
  {
    icon: Activity,
    badge: "Real-Time",
    title: "Instant Nearby Matching",
    desc: "Our smart notification system alerts nearby compatible donors within seconds of an urgent blood request to save critical time.",
    color: "from-amber-500 to-red-500",
    glow: "bg-red-500/[0.03]",
  },
  {
    icon: ShieldAlert,
    badge: "Encrypted",
    title: "Protected Health Data",
    desc: "Your medical history and contact details are fully encrypted and securely guarded. We never share your personal data without your consent.",
    color: "from-cyan-500 to-blue-600",
    glow: "bg-blue-500/[0.03]",
  },
  {
    icon: Heart,
    badge: "Impact",
    title: "A Reliable Network",
    desc: "Join a fast-responding community built to bridge the gap between hospitals and donors, helping to end local blood shortages.",
    color: "from-rose-500 to-fuchsia-600",
    glow: "bg-rose-500/[0.03]",
  },
  {
    icon: Trophy,
    badge: "Rewards",
    title: "Track Your Milestones",
    desc: "Keep a history of your life-saving donations, earn community badges as you reach milestones, and unlock rewards from our local partners.",
    color: "from-violet-600 to-indigo-600",
    glow: "bg-violet-500/[0.03]",
  },
];

// Orchestration container variants for staggered child entry
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

const FeaturesSection = () => {
  return (
    <section className="relative py-32 bg-slate-50 text-slate-900 overflow-hidden select-none">
      {/* Light Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-200 h-200 rounded-full bg-red-50/60 blur-[140px] animate-[pulse_12s_infinite]" />
        <div className="absolute bottom-1/4 -right-1/4 w-180 h-180 rounded-full bg-indigo-50/60 blur-[140px] animate-[pulse_16s_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="max-w-3xl mb-24"
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
        </motion.div>

        {/* Features Grid Layout with Stagger Animation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
        >
          {coreFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="group relative bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/80 hover:border-slate-300 transition-colors duration-300 hover:shadow-xl hover:shadow-slate-200/60"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
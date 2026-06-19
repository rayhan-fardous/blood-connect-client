"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative py-32 bg-slate-50 text-slate-900 overflow-hidden select-none">
      {/* Premium Ambient Background Blobs (Soft pastels for light mode) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/4 w-160 h-160 rounded-full bg-red-100/50 blur-[130px] animate-[pulse_10s_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-180 h-180 rounded-full bg-rose-100/40 blur-[160px] animate-[pulse_14s_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-red-50 text-red-600 border border-red-200/60 mb-6 shadow-sm">
            <Heart size={14} className="animate-pulse text-red-500" />
            Active Emergency Pipeline
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Have an inquiry? <br />
            <span className="bg-linear-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Let’s bridge the gap.
            </span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Whether you are looking to secure emergency blood kits, establish
            institutional partnerships, or simply volunteer—our communications
            squad handles queries 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Core Communication Nodes */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Node */}
            <div className="group relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-red-500/30 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50">
              <div className="absolute inset-0 rounded-3xl bg-red-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                  <Phone size={24} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Emergency Hotlines
                  </h3>
                  <p className="text-slate-900 font-bold mt-1 group-hover:text-red-600 transition-colors duration-300">
                    +880 1700-000000
                  </p>
                  <p className="text-slate-500 text-sm font-light">
                    +880 1800-000000
                  </p>
                </div>
              </div>
            </div>

            {/* Email Node */}
            <div className="group relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-blue-500/30 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50">
              <div className="absolute inset-0 rounded-3xl bg-blue-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                  <Mail size={24} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Secure Inboxes
                  </h3>
                  <p className="text-slate-900 font-bold mt-1 group-hover:text-blue-600 transition-colors duration-300">
                    support@bloodbridge.com
                  </p>
                  <p className="text-slate-500 text-sm font-light">
                    partnerships@bloodbridge.com
                  </p>
                </div>
              </div>
            </div>

            {/* Location Node */}
            <div className="group relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/30 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50">
              <div className="absolute inset-0 rounded-3xl bg-emerald-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0">
                  <MapPin size={24} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    HQ Coordinate
                  </h3>
                  <p className="text-slate-900 font-bold mt-1 group-hover:text-emerald-600 transition-colors duration-300">
                    Dhanmondi Architecture Hub
                  </p>
                  <p className="text-slate-500 text-sm font-light leading-snug">
                    123, Life Saver Road, Dhaka, BD
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Encrypted Form Wrapper */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative">
            {/* Top Light Accent Line */}
            <div className="absolute top-0 left-12 right-12 h-0.5 bg-linear-to-r from-red-500 to-rose-500 opacity-60" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <MessageSquare size={24} className="text-red-500" />
                <h3 className="text-2xl font-black tracking-tight text-slate-900">
                  Secure Dispatch
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                <ShieldCheck size={12} className="text-emerald-600" />
                E2E Encrypted
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                  >
                    Identity Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 font-light focus:bg-white"
                    placeholder="e.g. Alexis Carter"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                  >
                    Email Interface
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 font-light focus:bg-white"
                    placeholder="alexis@domain.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                >
                  Message Objective
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 font-light focus:bg-white"
                  placeholder="Urgent camp integration / Donor token query"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
                >
                  Elaborate Query
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 resize-none font-light leading-relaxed focus:bg-white"
                  placeholder="Type your brief breakdown here..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/20 transition-all duration-500 hover:-translate-y-1.5 tracking-wide active:translate-y-0"
              >
                <Send size={18} />
                Transmit Message
              </button>

              {/* Status Banner */}
              {submitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-center text-sm font-mono tracking-wide animate-[fadeIn_0.3s_ease-out]">
                  ✓ Packet transmitted successfully. Response pending.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

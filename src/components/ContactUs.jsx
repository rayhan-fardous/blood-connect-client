"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  MessageSquare,
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Clear form fields after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative py-24 bg-slate-50 text-slate-900 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-160 h-160 rounded-full bg-red-100/50 blur-[130px] animate-[pulse_10s_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-180 h-180 rounded-full bg-rose-100/40 blur-[160px] animate-[pulse_14s_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/60 mb-6 shadow-sm">
            <Heart size={14} className="animate-pulse text-red-500" />
            Emergency Response Available
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            Have a question? <br />
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Get in touch with us.
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl font-light leading-relaxed">
            Whether you need emergency blood kits, want to partner with us, or are looking to volunteer, our team is available 24/7 to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Node */}
            <div className="group relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Emergency Hotline
                  </h3>
                  <a href="tel:+8801785473355" className="block text-slate-900 font-bold mt-1 group-hover:text-red-600 transition-colors">
                    +880 1785-473355
                  </a>
                  <p className="text-slate-500 text-sm font-light">Available 24/7</p>
                </div>
              </div>
            </div>

            {/* Email Node */}
            <div className="group relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Support
                  </h3>
                  <a href="mailto:support@bloodconnect.com" className="block text-slate-900 font-bold mt-1 group-hover:text-blue-600 transition-colors">
                    support@bloodconnect.com
                  </a>
                  <a href="mailto:partnerships@bloodconnect.com" className="block text-slate-500 text-sm font-light hover:text-blue-600 transition-colors">
                    partnerships@bloodconnect.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location Node */}
            <div className="group relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Headquarters
                  </h3>
                  <p className="text-slate-900 font-bold mt-1 group-hover:text-emerald-600 transition-colors">
                    Banani Architecture Hub, Dhaka-1213
                  </p>
                  <p className="text-slate-500 text-sm font-light leading-snug">
                    Level 4, Plot 16, Block C, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/40 relative">
            <div className="absolute top-0 left-12 right-12 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 opacity-60" />

            <div className="flex items-center gap-3 mb-8">
              <MessageSquare size={24} className="text-red-500" />
              <h3 className="text-2xl font-black tracking-tight text-slate-900">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 focus:bg-white"
                    placeholder="Alexis Carter"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 focus:bg-white"
                    placeholder="alexis@domain.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Subject
                  </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 focus:bg-white"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition duration-300 resize-none focus:bg-white"
                  placeholder="Type your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/20 transition-all duration-500 hover:-translate-y-1 tracking-wide cursor-pointer"
              >
                <Send size={18} />
                Send Message
              </button>

              {/* Status Success Message */}
              {submitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-center text-sm font-medium transition duration-300">
                  ✓ Message sent successfully! Our team will respond shortly.
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
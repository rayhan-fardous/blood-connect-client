'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Heart,
  AlertCircle,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Building,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all required fields.');
      return;
    }

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Thank you! Your message has been dispatched to our team.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 overflow-hidden relative">
      {/* Background Soft Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70 mb-4 shadow-xs">
            <Heart size={14} className="text-red-500 animate-pulse" />
            24/7 Support & Emergency Dispatch
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            We’re Here When You <br className="hidden sm:inline" />
            <span className="text-red-600">Need Us Most</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions, need urgent assistance, or want to partner with us for a blood drive? Reach out anytime.
          </p>
        </div>

        {/* EMERGENCY HOTLINE ALERT BANNER */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg shadow-red-500/20 mb-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <AlertCircle size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Immediate Medical Emergency?</h3>
                <p className="text-red-100 text-xs sm:text-sm mt-0.5">
                  Call our 24/7 dedicated emergency line or view real-time open donation requisitions.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <a
                href="tel:+8801785473355"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-red-600 font-bold text-sm shadow-sm hover:bg-red-50 transition-all shrink-0"
              >
                <Phone size={16} />
                +880 1785-473355
              </a>
              <Link
                href="/donation-requests"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-700/70 hover:bg-red-700 text-white border border-red-400/40 font-semibold text-sm transition-all shrink-0"
              >
                Find Blood Now
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN 2-COLUMN SECTION: CARDS & FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* LEFT: CONTACT INFORMATION CARDS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Channels</h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Support</span>
                    <p className="font-bold text-slate-900 text-base mt-0.5">
                      <a href="tel:+8801785473355" className="hover:text-red-600 transition-colors">
                        +880 1785-473355
                      </a>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Available 24 hours a day, 7 days a week</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                    <p className="font-bold text-slate-900 text-base mt-0.5">
                      <a href="mailto:info@bloodconnect.org" className="hover:text-red-600 transition-colors break-all">
                        info@bloodconnect.org
                      </a>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Typical response within 2 hours</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Headquarters</span>
                    <p className="font-bold text-slate-900 text-sm sm:text-base mt-0.5 leading-snug">
                      Level 4, Plot 16, Block C, Banani, Dhaka-1213, Bangladesh
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Main Operations & Volunteer Hub</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Office Hours</span>
                    <p className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                      Saturday – Thursday: 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Online Emergency Support: 24/7/365</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* QUICK FAQ PROMPT */}
            <div className="bg-slate-100/80 rounded-3xl p-6 border border-slate-200/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white text-slate-700 flex items-center justify-center shrink-0 shadow-xs">
                <HelpCircle size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Looking for immediate answers?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Explore our FAQ Center for eligibility and donation guidelines.</p>
              </div>
              <Link
                href="/faq"
                className="px-3.5 py-1.5 rounded-xl bg-white text-red-600 font-semibold text-xs border border-slate-200 hover:border-red-200 transition-all shrink-0 shadow-xs"
              >
                FAQ Center
              </Link>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE CONTACT FORM */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Send us a Message</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out the form below and our operations or medical volunteer coordinator will follow up promptly.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <span>Your message has been received! We will be in touch shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. tanvir@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +880 1712 345678"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Emergency Blood Help">Emergency Blood Help</option>
                    <option value="Donor Registration Issue">Donor Registration Issue</option>
                    <option value="Blood Drive / University Partnership">Blood Drive / Partnership</option>
                    <option value="Volunteer Application">Volunteer Application</option>
                    <option value="Feedback / Bug Report">Feedback / Bug Report</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we assist you today? Please provide any helpful details..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md shadow-red-500/20 hover:bg-red-700 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Heart,
  Droplet,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  'All',
  'General',
  'Eligibility',
  'Donation Process',
  'Safety & Privacy',
  'Emergency',
];

const faqs = [
  {
    category: 'General',
    question: 'What is BloodConnect and how does it work?',
    answer:
      'BloodConnect is a non-profit humanitarian platform that connects voluntary blood donors with patients requiring blood across Bangladesh in real time. Requisitions are submitted, verified, and broadcast to nearby compatible donors by district and upazila.',
  },
  {
    category: 'General',
    question: 'Are there any fees or charges for using BloodConnect?',
    answer:
      'No, absolutely not. BloodConnect is 100% free for both donors and recipients. Selling or buying blood is illegal in Bangladesh and strictly forbidden on our platform.',
  },
  {
    category: 'Eligibility',
    question: 'Who can donate blood?',
    answer:
      'Any individual between the ages of 18 and 60, weighing at least 45–50 kg (depending on medical standards), with normal blood pressure and a hemoglobin count above 12.5 g/dL can donate blood, provided they are not suffering from active acute or chronic infections.',
  },
  {
    category: 'Eligibility',
    question: 'How often can I donate blood?',
    answer:
      'Healthy male donors can donate whole blood every 3 months (90 days), while female donors can donate every 4 months (120 days). Platelet (apheresis) donations can be made more frequently as recommended by your physician.',
  },
  {
    category: 'Eligibility',
    question: 'Can I donate if I have a tattoo, piercing, or recent dental work?',
    answer:
      'If you have received a tattoo or cosmetic piercing, medical guidelines in Bangladesh recommend waiting 6 to 12 months before donating blood. For routine dental cleanings, you may donate after 24 hours; for tooth extractions or oral surgery, please wait at least 72 hours.',
  },
  {
    category: 'Donation Process',
    question: 'How long does the blood donation process take?',
    answer:
      'The actual blood draw takes only 8 to 12 minutes! The entire appointment—including quick registration, a preliminary hemoglobin & blood pressure check, and 15 minutes of resting with refreshments—takes about 30 to 45 minutes.',
  },
  {
    category: 'Donation Process',
    question: 'What should I do before and after donating blood?',
    answer:
      'Before donating: drink plenty of water (16–20 oz), eat a nutritious iron-rich meal, and avoid fatty foods. After donating: rest for 15 minutes, drink hydrating liquids, avoid strenuous physical exercise for the rest of the day, and keep the bandage on for a few hours.',
  },
  {
    category: 'Safety & Privacy',
    question: 'Is it completely safe to donate blood? Can I contract an infection?',
    answer:
      'Donating blood is 100% safe. A sterile, single-use needle and collection kit are used once for your donation and then disposed of immediately in biohazard containers. You cannot contract HIV, hepatitis, or any other blood-borne virus by donating blood.',
  },
  {
    category: 'Safety & Privacy',
    question: 'How is my personal phone number and location protected?',
    answer:
      'We treat donor privacy with paramount importance. Your phone number is only shared when a verified emergency match occurs or through our secured dispatch mechanism. We never sell or share donor directories with marketing or commercial entities.',
  },
  {
    category: 'Emergency',
    question: 'How do I submit an urgent blood request for a patient?',
    answer:
      'Navigate to the "Donation Requests" page or login to your dashboard to create an urgent requisition. Specify the patient name, hospital location, required blood group, number of bags, and date. Nearby donors will be alerted immediately.',
  },
  {
    category: 'Emergency',
    question: 'What if the required blood group is rare (e.g., AB- or O-)?',
    answer:
      'Our intelligent matching engine prioritizes universal donors (O- for red cells, AB+ for plasma) and broadcasts notifications across adjacent upazilas and emergency volunteer circles to expedite finding a compatible lifesaver.',
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-28 pb-20 overflow-hidden relative">
      {/* Background Soft Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-12 left-1/3 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/70 mb-4 shadow-xs">
            <HelpCircle size={14} className="text-red-500" />
            Knowledge Base & Guidance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about donating blood, patient requests, and safety standards in Bangladesh.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-2xl mx-auto mb-8 shadow-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search questions (e.g. eligibility, safety, rare blood, tattoo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
          />
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <HelpCircle size={40} className="text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No matching questions found</h3>
              <p className="text-sm text-slate-500 mb-6">
                Try using different keywords or feel free to message our support team directly.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold text-xs border border-red-200 hover:bg-red-100 transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-red-50 text-red-600' : ''
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed">
                      <p>{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Category:
                        </span>
                        <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* STILL HAVE QUESTIONS HELPER CARD */}
        <div className="bg-gradient-to-br from-white to-red-50/50 rounded-3xl p-6 sm:p-10 border border-red-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles size={14} />
              AI Support & Help Desk
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Still have questions or need personalized help?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Ask our AI assistant BloodBot on the bottom right or reach out to our emergency support coordinators.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/20 transition-all flex items-center gap-2"
            >
              Contact Support
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

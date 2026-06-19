'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  'General',
  'Eligibility',
  'Donation Process',
  'Safety & Privacy',
  'Emergency',
];

const faqData = [
  {
    category: 'General',
    question: 'What is BloodBridge?',
    answer:
      'BloodBridge is a free, community‑driven platform that connects blood donors with patients in urgent need across Bangladesh. We aim to make blood donation fast, safe, and accessible to everyone.',
  },
  {
    category: 'General',
    question: 'Is there any cost to use BloodBridge?',
    answer:
      'No. BloodBridge is completely free for both donors and recipients. Our mission is to save lives without any financial barrier.',
  },
  {
    category: 'Eligibility',
    question: 'Who can donate blood?',
    answer:
      'Generally, anyone between 18–60 years, weighing over 50 kg, and in good health can donate. Specific eligibility is assessed during the mini health check‑up before each donation.',
  },
  {
    category: 'Eligibility',
    question: 'Can I donate if I have a tattoo or piercing?',
    answer:
      'You may need to wait 6–12 months after getting a tattoo or piercing, depending on the safety standards followed. Please mention it during registration.',
  },
  {
    category: 'Donation Process',
    question: 'How do I register as a donor?',
    answer:
      'Click on “Join as a donor” or visit the Registration page. Fill in your details, blood group, and preferred areas. After verification, you’ll be listed as a donor.',
  },
  {
    category: 'Donation Process',
    question: 'What happens after I request blood?',
    answer:
      'Nearby matched donors receive an instant notification. Once a donor accepts, you’ll be connected to coordinate the donation safely.',
  },
  {
    category: 'Safety & Privacy',
    question: 'Is my personal information safe?',
    answer:
      'Absolutely. We use bank‑level encryption. Your data is only shared with medical professionals during a verified donation request.',
  },
  {
    category: 'Safety & Privacy',
    question: 'How are donors verified?',
    answer:
      'Donors undergo a basic health check and their provided documents are reviewed manually. We also use community ratings to ensure trust.',
  },
  {
    category: 'Emergency',
    question: 'How fast can I get a donor in an emergency?',
    answer:
      'Our emergency system notifies matched donors instantly. Most requests get a response within 15–30 minutes in urban areas.',
  },
  {
    category: 'Emergency',
    question: 'What if no donor matches my required blood group?',
    answer:
      'We also alert universal donors (O‑) in critical situations. You can reach our support team for alternative solutions.',
  },
];

const FAQSectionAlt = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqData.filter(
    (item) => item.category === activeCategory
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setOpenIndex(null);
  };

  return (
    <section className="relative bg-white text-slate-900 py-24 sm:py-32 overflow-hidden select-none">
      {/* Decorative Blur Backdrops */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-140 h-140 bg-rose-50/70 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-160 h-160 bg-slate-50 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200/60 rounded-full text-[11px] font-medium uppercase tracking-wider text-slate-500 mb-6 shadow-xs">
            <HelpCircle size={14} className="text-red-500" />
            Help Center
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-none">
            Frequently Asked <br />
            <span className="bg-linear-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl font-light max-w-xl leading-relaxed">
            Find simple answers to common questions or reach out to our team directly.
          </p>
        </div>

        {/* Master Flex/Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
          
          {/* Left Segment: Premium Sticky Pill Navigation */}
          <div className="lg:w-1/4 lg:sticky lg:top-28 z-20">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 border-b lg:border-b-0 border-slate-100 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`whitespace-nowrap text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 relative group shrink-0 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {/* Active Background Pill Tracker */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBg"
                        className="absolute inset-0 bg-slate-900 rounded-2xl shadow-lg shadow-slate-900/10 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <span className="relative z-10">{cat}</span>
                    
                    {isActive && (
                      <motion.span 
                        layoutId="activeCategoryDot"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full hidden lg:block" 
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Segment: Minimalist Expansion Accordion */}
          <div className="lg:w-3/4 space-y-4">
            {/* AnimatePresence handles smooth content updates when swapping categories */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="space-y-4"
              >
                {filteredFaqs.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-3xl transition-all duration-300 ${
                        isOpen 
                          ? 'border-slate-300 shadow-xl shadow-slate-100/80' 
                          : 'border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-hidden group"
                      >
                        <span className={`text-base sm:text-lg font-bold transition-colors duration-300 pr-6 ${
                          isOpen ? 'text-red-600' : 'text-slate-900 group-hover:text-red-600'
                        }`}>
                          {item.question}
                        </span>
                        
                        {/* Modern Clean Circular Trigger */}
                        <motion.span 
                          animate={{ 
                            rotate: isOpen ? 45 : 0,
                            backgroundColor: isOpen ? '#dc2626' : '#f8fafc',
                            borderColor: isOpen ? '#dc2626' : '#e2e8f0',
                            color: isOpen ? '#ffffff' : '#64748b'
                          }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-100"
                        >
                          <Plus size={16} strokeWidth={2.5} />
                        </motion.span>
                      </button>

                      {/* Framer Motion Layout Height Accordion */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 text-sm sm:text-base leading-relaxed font-light border-t border-slate-100 pt-4">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Banner Card Redesign */}
        <div className="mt-24 bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white/4 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/6 border border-white/8 flex items-center justify-center mb-6">
              <MessageCircle size={22} className="text-red-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Still have questions?
            </h3>
            <p className="text-slate-400 font-light text-base sm:text-lg mb-8 max-w-md">
              Our volunteer support team is here online twenty-four hours a day, seven days a week.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full hover:bg-slate-50 transition-all active:scale-98 shadow-md"
            >
              Contact Us
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSectionAlt;
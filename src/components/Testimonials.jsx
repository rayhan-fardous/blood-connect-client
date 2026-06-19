'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Tariq Anam',
    role: 'First-time Donor',
    avatar: 'https://i.pravatar.cc/150?img=33',
    quote:
      'I was always nervous about needles, but the team walked me through everything step by step. Giving blood was surprisingly quick, and knowing my small contribution helped an infant surgery made every second worth it.',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'Leukemia Survivor',
    avatar: 'https://i.pravatar.cc/150?img=47',
    quote:
      'During my cancer treatments, I relied heavily on matching blood donations from kind strangers. This community gave me a second chance at life, and now my entire family signs up to pay it forward every chance we get.',
  },
  {
    id: 3,
    name: 'Zayn Malik',
    role: 'Platelet Donor',
    avatar: 'https://i.pravatar.cc/150?img=68',
    quote:
      'Donating platelets is my quiet routine to give back. The platform makes tracking my impact clear and rewarding. Seeing the notification that your donation has officially reached a hospital is an incredible feeling.',
  },
  {
    id: 4,
    name: 'Farhana Chowdhury',
    role: 'ER Nurse',
    avatar: 'https://i.pravatar.cc/150?img=23',
    quote:
      'In the emergency room, minutes save lives. Having a reliable, high-speed network that instantly connects families with nearby donors completely shifts the odds in our favor during critical situations.',
  },
  {
    id: 5,
    name: 'Imran Khan',
    role: 'Community Organizer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    quote:
      'We hosted our first neighborhood blood drive using this platform to coordinate sign-ups. The clean layout and instant reminders helped us pass our original donation goal by forty percent.',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = testimonials.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative py-24 md:py-32 bg-slate-50/50 text-slate-900 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Modern Radial Gradient & Mesh Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[24px_24px] opacity-40" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-linear-to-tr from-rose-200/30 to-amber-100/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-linear-to-bl from-red-100/30 to-slate-200/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Modern Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-full text-[11px] font-medium uppercase tracking-wider text-slate-600 mb-12 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Voices of Impact
        </div>

        {/* Outer Slider Box */}
        <div className="w-full relative min-h-85 sm:min-h-70 flex items-center justify-center">
          
          {/* Large Clean Background Quote Symbol */}
          <Quote className="absolute top-0 text-slate-200/50 w-32 h-32 -z-10 pointer-events-none transform -translate-y-6" strokeWidth={1} />

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-xs items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-400 transition-all active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Previous story"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dynamic Content Frame - Added rigid width constraints to eliminate peaking */}
          <div className="w-full max-w-2xl mx-auto overflow-hidden px-2">
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="w-full shrink-0 flex flex-col items-center px-4 box-border">
                  {/* Fixed 5-Star Presentation */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Clean, Impactful Statement Text */}
                  <p className="text-lg sm:text-xl md:text-2xl font-normal tracking-tight text-slate-800 leading-relaxed max-w-xl text-center">
                    “{item.quote}”
                  </p>

                  {/* Metadata Stack */}
                  <div className="mt-8 space-y-1">
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">{item.name}</h4>
                    <p className="text-xs font-semibold tracking-wider text-red-600 uppercase">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-xs items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-400 transition-all active:scale-95 shadow-sm hover:shadow-md"
            aria-label="Next story"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Interactive Face Grid Indicators */}
        <div className="mt-16 flex items-center justify-center gap-4 border-t border-slate-200/60 pt-10 w-full max-w-md">
          {testimonials.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className="relative group focus:outline-none"
                aria-label={`Show testimonial from ${item.name}`}
              >
                {/* Active Outer Highlight Ring */}
                <span className={`absolute -inset-1.5 rounded-full border-2 border-red-500 transition-all duration-500 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-30 group-hover:scale-90'
                }`} />
                
                {/* Profile Image Container */}
                <div className={`w-11 h-11 rounded-full overflow-hidden border bg-slate-100 transition-all duration-500 transform ${
                  isActive ? 'grayscale-0 scale-105 border-white shadow-md' : 'grayscale border-slate-200 hover:grayscale-30 hover:scale-105'
                }`}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { testimonialsData } from '../../data/testimonialsData';

export const StudentSuccess: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const current = testimonialsData[activeIdx];

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-flex items-center gap-1.5 mb-3">
              <Award className="w-3.5 h-3.5 text-cyan-500" />
              Real Alumni Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Student Stories & Verified Career Outcomes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
              Hear from graduates who secured licencing, promotions, and UK university degrees through Apex Academy.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlighted Testimonial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-800/90 dark:to-indigo-950/40 border border-slate-200/80 dark:border-slate-700/80 shadow-xl relative"
              >
                <Quote className="w-12 h-12 text-indigo-200 dark:text-indigo-900/60 absolute top-6 right-6 pointer-events-none" />

                {/* Star rating */}
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">
                    Verified Graduate • {current.course}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic mb-6">
                  "{current.quote}"
                </p>

                {/* Student Info */}
                <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                        {current.name}
                      </h4>
                      <span className="text-base">{current.flag}</span>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {current.role}
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {current.outcome}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Stats & Mini Thumbnails */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Browse More Stories
            </h4>
            <div className="space-y-2.5">
              {testimonialsData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(index)}
                  className={`w-full p-3 rounded-2xl text-left flex items-center space-x-3 transition-all ${
                    index === activeIdx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">
                      {item.name} {item.flag}
                    </p>
                    <p className={`text-[11px] truncate ${index === activeIdx ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {item.course}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

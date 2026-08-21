import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqsData } from '../../data/faqsData';
import { useModal } from '../../context/ModalContext';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);
  const { openAdvisorModal } = useModal();

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Show top 6 FAQs on home page
  const homeFaqs = faqsData.slice(0, 6);

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0E1322] relative overflow-hidden" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Everything you need to know about our certifications, timetables, and UK admission pathways.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {homeFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-10 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Still have questions?</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Our academic advisors are available Mon-Sat to guide you.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => openAdvisorModal('General Questions')}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Ask an Advisor
            </button>
            <Link
              to="/faq"
              className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              View Full FAQ (20+)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

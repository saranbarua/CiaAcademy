import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, HelpCircle, PhoneCall, Mail } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { faqsData } from '../data/faqsData';
import { useModal } from '../context/ModalContext';

export const FAQPage: React.FC = () => {
  const { openAdvisorModal } = useModal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const categories = ['All', 'Admissions', 'Courses & Certifications', 'International & Visa', 'Fees & Funding', 'Career & Exams'];

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.slice(0, 10).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Apex Academy London"
        description="Find answers to all questions regarding SIA licence training, CSCS green card tests, UK university top-up diplomas, student visa requirements, and tuition fees."
        keywords="Apex Academy FAQ, SIA course questions, CSCS test help London, UK student visa FAQ, degree top up questions"
        canonicalUrl="https://apexacademy.ac.uk/faq"
        schemaJson={faqSchema}
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

        {/* Hero */}
        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                Help & Knowledge Base
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                Frequently Asked Questions
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                Quick, authoritative answers about our courses, accreditation, timetables, and admissions.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-slate-800/90 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 mb-8">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions (e.g. SIA licence, deposit, re-sit, CAS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <span>{faq.question}</span>
                    <div className={`p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 transition-transform ${isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Still Need Help Box */}
          <div className="mt-12 p-6 rounded-3xl bg-indigo-50/80 dark:bg-slate-850 border border-indigo-100 dark:border-slate-700 text-center space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Can't find the answer you're looking for?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Our course admissions advisors are available on live phone and email support Monday to Saturday.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => openAdvisorModal('FAQ Unresolved Question')}
                className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 shadow-md"
              >
                Speak with an Advisor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Award
} from 'lucide-react';
import { countryGuidesData } from '../../data/countryGuidesData';
import { useModal } from '../../context/ModalContext';

export const InternationalStudentsSection: React.FC = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('BD');
  const { openAdvisorModal } = useModal();

  const selectedCountry = countryGuidesData.find((c) => c.code === selectedCountryCode) || countryGuidesData[0];

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] relative overflow-hidden" id="international-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-flex items-center gap-1.5 mb-3">
            <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
            Global Student Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Country-Specific Admission & Visa Guidance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Select your country of origin to view tailored academic entry requirements, English test alternatives, and verified CAS processing timelines.
          </p>
        </div>

        {/* Country Flags Selector Bar */}
        <div className="flex items-center justify-start sm:justify-center space-x-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {countryGuidesData.map((c) => {
            const isSelected = selectedCountryCode === c.code;
            return (
              <button
                key={c.code}
                onClick={() => setSelectedCountryCode(c.code)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Country Detail Card */}
        <motion.div
          key={selectedCountry.code}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl sm:text-4xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {selectedCountry.name} Student Admission Desk
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    UK Higher Education & Professional Training Pathways
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCountry.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Academic Entry Criteria
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedCountry.academicRequirement}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    English Requirement
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedCountry.englishRequirement}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Visa & Processing
                  </span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedCountry.visaType} ({selectedCountry.processingTime})
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Popular Choices
                  </span>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {selectedCountry.popularChoices.join(' • ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Action Callout */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-violet-900 text-white text-center space-y-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-cyan-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-display">Need Eligibility Assessment?</h4>
                <p className="text-xs text-indigo-200 mt-1">
                  Send your academic transcripts and passport copy for free evaluation within 24 hours.
                </p>
              </div>
              <button
                onClick={() => openAdvisorModal(`International Advisory (${selectedCountry.name})`)}
                className="w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Talk to {selectedCountry.name} Desk Advisor
              </button>
              <Link
                to="/international-students"
                className="inline-flex items-center text-xs text-cyan-300 hover:underline gap-1 pt-1"
              >
                <span>Read Full International Student Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Ethical Disclaimer */}
        <div className="mt-6 flex items-start space-x-2.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-850 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <ShieldAlert className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Compliance Note:</strong> Apex Academy adheres strictly to UK Home Office and British Council quality frameworks. We provide legitimate academic counselling and document auditing; final visa determinations are exclusively made by UK Visas and Immigration (UKVI).
          </p>
        </div>
      </div>
    </section>
  );
};

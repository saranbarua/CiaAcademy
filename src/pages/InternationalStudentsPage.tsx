import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Globe2,
  FileCheck2,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  Building,
  Plane,
  Home,
  Briefcase,
  Download,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { countryGuidesData } from '../data/countryGuidesData';
import { useModal } from '../context/ModalContext';
import { CTASection } from '../components/home/CTASection';

export const InternationalStudentsPage: React.FC = () => {
  const { openAdvisorModal, openBrochureModal } = useModal();
  const [selectedCountryCode, setSelectedCountryCode] = useState('BD');

  const selectedCountry = countryGuidesData.find((c) => c.code === selectedCountryCode) || countryGuidesData[0];

  const visaSteps = [
    {
      step: '01',
      title: 'Academic Assessment & Offer Letter',
      desc: 'Submit your transcripts and passport. Receive a conditional or unconditional offer letter within 48 hours.'
    },
    {
      step: '02',
      title: 'Credibility Interview & English Verification',
      desc: 'Complete an online mock interview with our admissions committee and submit IELTS, PTE, or Medium of Instruction evidence.'
    },
    {
      step: '03',
      title: 'Financial Maintenance (28-Day Rule)',
      desc: 'Verify proof of living funds (£1,483/month in London) and tuition fees held in your bank account for 28 consecutive days.'
    },
    {
      step: '04',
      title: 'Confirmation of Acceptance for Studies (CAS)',
      desc: 'Pay your initial tuition deposit and receive your official electronic CAS reference number.'
    },
    {
      step: '05',
      title: 'Student Route Visa Application',
      desc: 'Book your biometric appointment at your local VFS/TLS center and receive your 90-day travel vignette.'
    }
  ];

  return (
    <>
      <SEOHead
        title="International Students & Visa Admissions Hub | Apex Academy London"
        description="Comprehensive admission guide for international applicants from Bangladesh, India, Pakistan, Nigeria, Ghana, Nepal, and UAE. Student Route visa requirements, CAS issuance, and London arrival support."
        keywords="international students UK, study in London, UK student visa 28 day rule, CAS letter UK, Bangladesh students in UK, Nigeria study in UK"
        canonicalUrl="https://apexacademy.ac.uk/international-students"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: 'International Students' }]} />

        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                Global Student Admissions
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Welcome to London: Study, Grow & Graduate
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Join our vibrant international student body representing over 40 countries. We provide end-to-end guidance from initial eligibility evaluation to CAS issuance, visa application, and airport arrival.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => openAdvisorModal('International Desk')}
                  className="px-6 py-3.5 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Free CAS Eligibility Assessment</span>
                </button>
                <button
                  onClick={() => openBrochureModal()}
                  className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download International Guide</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Country Guides Section */}
        <section className="py-16 bg-white dark:bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Country-Specific Admission Requirements
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select your home country to view recognized secondary & university credentials.
              </p>
            </div>

            {/* Country Tabs */}
            <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {countryGuidesData.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountryCode(c.code)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex-shrink-0 ${
                    selectedCountryCode === c.code
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Country Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-6">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {selectedCountry.name} Applicants Guide
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Visa Type: {selectedCountry.visaType} (Processing: {selectedCountry.processingTime})
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCountry.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase">Academic Requirements</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {selectedCountry.academicRequirement}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase">English Language Test</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {selectedCountry.englishRequirement}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Popular Course Pathways for {selectedCountry.name} Applicants:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCountry.popularChoices.map((choice, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{choice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-Step Visa Timeline */}
        <section className="py-16 bg-slate-50 dark:bg-[#0E1322]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-2">
                Visa Roadmap
              </span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                5 Steps to Your UK Student Visa
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {visaSteps.map((s) => (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 space-y-2"
                >
                  <span className="text-2xl font-extrabold font-display text-indigo-600 dark:text-indigo-400">
                    {s.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </div>
    </>
  );
};

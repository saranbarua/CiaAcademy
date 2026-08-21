import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building,
  CheckCircle2,
  FileCheck2,
  Briefcase,
  Plane,
  Home,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Calculator,
  Download,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useModal } from '../context/ModalContext';
import { CTASection } from '../components/home/CTASection';

export const StudyInUkPage: React.FC = () => {
  const { openBrochureModal, openAdvisorModal } = useModal();

  const [selectedPathway, setSelectedPathway] = useState<'topup' | 'foundation' | 'master'>('topup');

  const comparisonData = [
    {
      metric: 'Standard 3-Year UK University Route',
      cost: '£45,000 - £60,000 Total Tuition',
      duration: '3 Years Full-Time',
      qualification: 'BSc / BA (Hons)',
      structure: 'Year 1 + Year 2 + Year 3 at University Campus'
    },
    {
      metric: 'Apex Academy Fast-Track Top-Up Route',
      cost: '£14,500 - £18,000 Total Tuition (Save over £25,000)',
      duration: '2 Years Total (Fast-Tracked)',
      qualification: 'BSc / BA (Hons) from Partner UK University',
      structure: 'Year 1 & 2 at Apex Academy (240 Ofqual Credits) + Final Year 3 at University'
    }
  ];

  return (
    <>
      <SEOHead
        title="Study in the UK | Fast-Track Degree Top-Up & University Pathways | Apex Academy"
        description="Earn an accredited British Bachelor or Master Degree through Apex Academy's Level 4 & 5 Extended Diplomas and direct UK University Top-Up partnerships."
        keywords="study in UK, top up degree UK, bachelor degree fast track London, Level 5 diploma university progression, UK university pathways"
        canonicalUrl="https://apexacademy.ac.uk/study-in-uk"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: 'Study in the UK' }]} />

        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Higher Education Pathways
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Your Direct Route to a British University Degree
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Save up to 40% on standard UK university tuition while studying in Central London. Progress seamlessly from Level 4/5 Ofqual diplomas directly into the final year of a UK Bachelor's Honours degree.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/apply"
                  className="px-6 py-3.5 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
                >
                  Apply for Degree Pathway
                </Link>
                <button
                  onClick={() => openAdvisorModal('Study in UK Pathway')}
                  className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>Free Degree Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison Matrix */}
        <section className="py-16 bg-white dark:bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-2">
                Tuition Savings
              </span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                How Our Fast-Track Pathway Saves You Thousands
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Standard Route */}
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 inline-block">
                  Standard Route
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  3 Years Direct University
                </h3>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  £45,000 – £60,000
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-2">
                  <li>• Pay full high international university fees for all 3 years</li>
                  <li>• High entry IELTS hurdles (typically 6.5 minimum)</li>
                  <li>• Massive lecture halls with 200+ students</li>
                </ul>
              </div>

              {/* Apex Fast-Track */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-violet-950 text-white border-2 border-indigo-500 shadow-2xl space-y-4 relative">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400 text-slate-950 inline-block">
                  Recommended Apex Route
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Level 4/5 Diploma + 1-Year Top-Up
                </h3>
                <p className="text-3xl font-extrabold text-cyan-300 font-display">
                  £14,500 – £18,000
                </p>
                <p className="text-xs text-emerald-400 font-bold">
                  ✓ Save up to £25,000+ in tuition fees
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 pt-2">
                  <li>• Complete Years 1 & 2 at Apex Academy (240 Ofqual Credits)</li>
                  <li>• Direct entry into final Year 3 (Top-Up) at top UK Universities</li>
                  <li>• Small class sizes with personalized 1-on-1 tutoring</li>
                  <li>• Graduate with the exact same BA/BSc (Hons) degree</li>
                  <li>• Full 2-Year Graduate Route Post-Study Work Visa eligibility</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pathways Breakdown Tabs */}
        <section className="py-16 bg-slate-50 dark:bg-[#0E1322]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Choose Your Progression Discipline
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  BA
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Business & Management
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Level 4 & 5 Extended Diploma in Business leading to BA (Hons) in Business Management, Marketing, or Finance.
                </p>
                <Link to="/courses/business" className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline gap-1 pt-2">
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  BSc
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Health & Social Care Leadership
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Level 4 & 5 Diploma in Adult Care leading to BSc (Hons) in Health & Social Care Services Management.
                </p>
                <Link to="/courses/health-social-care" className="inline-flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline gap-1 pt-2">
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  MSc
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                  Postgraduate / MBA Top-Up
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Level 7 Post-Graduate Diploma leading directly to MBA dissertation stage (6 months) at UK universities.
                </p>
                <Link to="/courses/business" className="inline-flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline gap-1 pt-2">
                  <span>View Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </div>
    </>
  );
};

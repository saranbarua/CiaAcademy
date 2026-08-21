import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  Briefcase,
  Home,
  Languages,
  FileText,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useModal } from '../context/ModalContext';
import { CTASection } from '../components/home/CTASection';

export const StudentSupportPage: React.FC = () => {
  const { openAdvisorModal } = useModal();

  const services = [
    {
      title: 'Career & Employment Clinic',
      icon: Briefcase,
      desc: 'Free 1-on-1 CV rewriting, mock interviews, LinkedIn optimisation, and direct employer vacancy referrals across London security, healthcare, and construction firms.'
    },
    {
      title: 'London Accommodation Assistance',
      icon: Home,
      desc: 'Guidance in finding verified student halls, private house shares, and homestays near our Commercial Road campus in zones 1 & 2.'
    },
    {
      title: 'Academic & English Language Support',
      icon: Languages,
      desc: 'Free weekly study clinics for academic writing, referencing (Harvard system), grammar workshops, and speaking practice.'
    },
    {
      title: 'Visa & Immigration Compliance Care',
      icon: ShieldCheck,
      desc: 'Support with biometric residence permit collection, national insurance number registration, police registration, and Graduate Route preparation.'
    },
    {
      title: 'Mental Health & Student Pastoral Welfare',
      icon: HeartHandshake,
      desc: 'Confidential counselling, wellness resources, disability access support, and community social events.'
    },
    {
      title: 'Alumni Network & Career Mentorship',
      icon: Users,
      desc: 'Connect with over 5,000 successful alumni working in NHS trusts, major security contractors, and corporate headquarters.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Student Support Services & Career Clinic | Apex Academy"
        description="Discover comprehensive student support at Apex Academy: CV review clinic, London student accommodation guidance, pastoral welfare, and English language clinics."
        keywords="student support London, UK student accommodation help, CV clinic London, graduate job assistance, international student welfare"
        canonicalUrl="https://apexacademy.ac.uk/student-support"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: 'Student Support' }]} />

        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block">
                Dedicated Student Care
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                We Support You from Enrolment to Graduation & Beyond
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Our Student Experience Desk is dedicated to ensuring you thrive academically, professionally, and personally while studying at Apex Academy in London.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openAdvisorModal('Student Support Enquiry')}
                  className="px-6 py-3.5 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-lg flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contact Student Support Team</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white dark:bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Comprehensive Student Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-3"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
};

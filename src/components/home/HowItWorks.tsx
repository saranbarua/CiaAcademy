import React from 'react';
import { motion } from 'motion/react';
import { Search, FileCheck, BookOpenCheck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Course or Pathway',
      description: 'Explore our accredited qualifications in SIA, CSCS, Care, or select a Bachelor/Master top-up route.',
      icon: Search
    },
    {
      number: '02',
      title: 'Submit Online Application',
      description: 'Fill out our quick 2-minute registration form with instant ID verification and flexible payment plan setup.',
      icon: FileCheck
    },
    {
      number: '03',
      title: 'Attend Classroom or Online',
      description: 'Train with expert tutors at our London campus or access modern digital study materials and mock exam banks.',
      icon: BookOpenCheck
    },
    {
      number: '04',
      title: 'Get Certified & Employed',
      description: 'Receive your Ofqual regulated diploma, licence portal upload, and one-on-one job referral support.',
      icon: Award
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0E1322] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-3">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            How to Get Started at Apex Academy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            From initial registration to regulated certificate dispatch, we make every step seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold font-display text-indigo-600/30 dark:text-indigo-400/30">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Step {idx + 1} of 4
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/apply"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-700 hover:to-violet-800 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start Your Application Today</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

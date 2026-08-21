import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building,
  FileCheck2,
  Plane,
  Home,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const StudyUKSection: React.FC = () => {
  const pathways = [
    {
      icon: GraduationCap,
      title: 'Undergraduate Degree Top-Up',
      description: 'Complete our Level 4/5 Extended Diplomas (240 Credits) and transition directly into the final Year 3 (Top-Up) of a UK Bachelor Degree (BA/BSc Hons), saving over £15,000 in university tuition.'
    },
    {
      icon: Building,
      title: 'Direct University Admissions (UCAS)',
      description: 'As a registered UCAS center, we partner with premier UK universities across London, Manchester, Birmingham, and Scotland to secure your conditional and unconditional offers.'
    },
    {
      icon: FileCheck2,
      title: 'CAS & Visa Compliance Auditing',
      description: 'Complete guidance on financial maintenance rules (28-day bank rule), Statement of Purpose (SOP) writing, and mock genuine student visa interview coaching.'
    },
    {
      icon: Briefcase,
      title: 'Graduate Route (2-Year Work Visa)',
      description: 'International students completing a UK undergraduate or postgraduate degree qualify for the 2-year post-study Graduate Route Visa to work in the UK without employer sponsorship.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-950/95 via-slate-900/95 to-violet-950/95 text-white relative overflow-hidden">
      {/* Background Frosted Glow Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Heading & Pathway Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-flex items-center gap-1.5 mb-3 backdrop-blur-sm shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Higher Education Pathways
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Study in the UK & Graduate with British Honours
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                Unlock world-class British qualifications through accelerated foundation diplomas, Level 5 university top-up routes, and comprehensive international student admission support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pathways.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-white/10 transition-all group shadow-xl hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-display mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/study-in-uk"
                className="px-7 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore UK Study Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admissions"
                className="px-6 py-3.5 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all shadow-xs"
              >
                View Intake Dates & Fees
              </Link>
            </div>
          </div>

          {/* Right Column: Visual UK Education Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900 aspect-[4/4.5] backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80"
                alt="London Skyline & UK Higher Education"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating Frosted London Badge Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-white/15 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Fast-Track Degree Pathway</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Save 40% Tuition</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">Level 5 Diploma + 1 Year University Top-Up</h4>
                <div className="mt-2.5 pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>240 Ofqual Credits</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>BA (Hons) Degree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

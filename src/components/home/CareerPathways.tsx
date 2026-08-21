import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  HeartHandshake,
  HardHat,
  Briefcase,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

export const CareerPathways: React.FC = () => {
  const pathways = [
    {
      sector: 'Private Security & Protection',
      icon: ShieldCheck,
      color: 'from-indigo-600 to-violet-700',
      roles: [
        { title: 'SIA Door Supervisor / Static Guard', pay: '£13.50 - £18.00 / hr' },
        { title: 'CCTV Control Room Supervisor', pay: '£30,000 - £36,000 / yr' },
        { title: 'Close Protection & VIP Security', pay: '£45,000 - £65,000 / yr' }
      ],
      link: '/courses/security'
    },
    {
      sector: 'Health & Adult Social Care',
      icon: HeartHandshake,
      color: 'from-teal-600 to-emerald-700',
      roles: [
        { title: 'Care Assistant / Support Worker', pay: '£12.50 - £15.00 / hr' },
        { title: 'Senior Care Worker (Level 3 RQF)', pay: '£25,000 - £31,000 / yr' },
        { title: 'Registered Care Manager (Level 5)', pay: '£38,000 - £50,000 / yr' }
      ],
      link: '/courses/health-social-care'
    },
    {
      sector: 'Construction & Site Management',
      icon: HardHat,
      color: 'from-amber-600 to-orange-700',
      roles: [
        { title: 'CSCS Site Operative / Trades Assistant', pay: '£13.00 - £17.00 / hr' },
        { title: 'SSSTS Site Supervisor / Foreman', pay: '£38,000 - £48,000 / yr' },
        { title: 'SMSTS Construction Site Manager', pay: '£55,000 - £75,000 / yr' }
      ],
      link: '/courses/construction'
    },
    {
      sector: 'Corporate Business & Leadership',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-800',
      roles: [
        { title: 'Business Operations Coordinator', pay: '£28,000 - £35,000 / yr' },
        { title: 'Project & Strategy Manager', pay: '£45,000 - £60,000 / yr' },
        { title: 'Executive Director (MBA Pathway)', pay: '£70,000+ / yr' }
      ],
      link: '/courses/business'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0E1322] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-flex items-center gap-1.5 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
            Employability & Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Turn Your Skills Into A High-Paying Career
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            See clear salary benchmarks and career progression roadmaps unlocked by our accredited qualification tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-4">
                    {item.sector}
                  </h3>

                  <div className="space-y-3">
                    {item.roles.map((role, rIdx) => (
                      <div key={rIdx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {role.title}
                        </p>
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {role.pay}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                  <Link
                    to={item.link}
                    className="inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-cyan-400 hover:underline gap-1"
                  >
                    <span>View Qualifying Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

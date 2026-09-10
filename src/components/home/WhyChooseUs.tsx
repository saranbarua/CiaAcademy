import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  Briefcase,
  Globe2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Ofqual Regulated & SIA Approved",
      description:
        "Every certificate is backed by accredited UK awarding bodies including Highfield, Pearson, Qualsafe, and the Security Industry Authority.",
    },
    {
      icon: Award,
      title: "96.4% First-Time Pass Guarantee",
      description:
        "Our proprietary question-drill system and practical physical simulations ensure unmatched first-time pass rates with free re-sits if needed.",
    },
    {
      icon: Users,
      title: "Industry Veteran Instructors",
      description:
        "Learn directly from seasoned security directors, senior NHS nurses, certified British Council examiners, and chartered accountants.",
    },
    {
      icon: Clock,
      title: "Fast-Track Results & Instant Uploads",
      description:
        "Exam results processed in 5-7 business days with direct electronic uploads to the SIA and CITB national databases.",
    },
    {
      icon: Briefcase,
      title: "Free CV Review & Job Assistance",
      description:
        "Access our dedicated career clinic with active vacancy referrals across security venues, construction sites, and NHS care providers.",
    },
    {
      icon: Globe2,
      title: "International Student & Visa Pathways",
      description:
        "Full CAS documentation auditing, Statement of Purpose guidance, and direct university Bachelor/Master top-up agreements.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0E1322] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Visual Education Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
                alt="Interactive Training Session at Care International  Academy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      UK Centre of Academic Quality
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      12+ Years of Trusted Training in London
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Floating Badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                96.4% Verified Pass Rate
              </span>
            </div>
          </div>

          {/* Right Column: Why Choose Us Content & Features */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-3">
                Why Students Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                The Gold Standard in UK Vocational & Degree Preparation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                Whether you need a fast-track licence to start working next week
                or a prestigious higher diploma to complete your degree, Care
                International Academy delivers certified excellence at every
                step.
              </p>
            </div>

            {/* Sequential Animated Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display leading-snug">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                      {feat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Learn More About Our Accreditations & Faculty →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

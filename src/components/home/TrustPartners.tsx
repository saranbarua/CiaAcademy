import React from "react";
import { Award } from "lucide-react";
import { partnersData } from "../../data/partnersData";

export const TrustPartners: React.FC = () => {
  const marqueePartners = [...partnersData, ...partnersData];

  return (
    <section className="py-12 border-y border-white/60 dark:border-white/10 relative overflow-hidden backdrop-blur-md bg-white/40 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Recognised & Regulated By Premier UK Awarding Bodies & Industry
          Regulators
        </p>
      </div>

      {/* Marquee Track Container with gradient edge masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-100/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none" />

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-100/90 dark:from-slate-950/90 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-6 sm:space-x-8 py-2">
          {marqueePartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center space-x-3 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-xs hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group cursor-default flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors block">
                  {partner.logoText}
                </span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 block">
                  {partner.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

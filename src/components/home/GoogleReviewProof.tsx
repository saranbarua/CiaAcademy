import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const GoogleReviewProof: React.FC = () => {
  return (
    <section className="py-8 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Star Breakdown */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-bold text-xl font-display shadow-md">
            G
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-extrabold text-white">4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">(580+ Google Reviews)</span>
            </div>
            <p className="text-xs text-slate-400">Rated "Excellent" for London Vocational & Higher Education</p>
          </div>
        </div>

        {/* Right: Quick Highlights */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Transparent Fees</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Free Exam Re-Sits Guarantee</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Immediate Certificate Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
};

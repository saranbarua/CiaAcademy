// src/components/home/GoogleReviewProof.tsx
import React, { useState, useEffect } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import {
  fetchApprovedTestimonials,
  averageOf,
  ApiTestimonial,
} from "../../data/api/testimonialsApi";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=care+international+academy+reviews&hl=en-GB&authuser=0&sxsrf=APpeQnt5sJEsw3_c6WuXVIsuF9qcg1KmOw%3A1789365711889#lrd=0x47d8a7c331c54801:0x369c92bda661a210,1,,,,";

export const GoogleReviewProof: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchApprovedTestimonials()
      .then((data) => {
        if (!cancelled)
          setTestimonials(Array.isArray(data) ? data.filter((t) => !!t) : []);
      })
      .catch(() => {
        // Silently ignore — this is a trust-signal strip, not critical content.
        // Falls back to a generic message rather than breaking the section.
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const average = averageOf(testimonials);
  const count = testimonials.length;

  return (
    <section className="py-8 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Star Breakdown */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-bold text-xl font-display shadow-md flex-shrink-0">
            G
          </div>
          <div>
            <div className="flex items-center space-x-1.5 flex-wrap">
              <span className="text-xl font-extrabold text-white">
                {loading ? "\u2013" : average || "\u2013"}
              </span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(average)
                        ? "fill-current"
                        : "fill-none stroke-current opacity-40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {loading
                  ? "Loading reviews\u2026"
                  : count > 0
                    ? `(${count}+ Reviews)`
                    : "(Reviews coming soon)"}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Rated "Excellent" for London Vocational & Higher Education
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                See all reviews on Google
              </a>
            </p>
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

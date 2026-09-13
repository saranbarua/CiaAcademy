import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Building,
  FileCheck2,
  Plane,
  Home,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Loader2,
  Send,
} from "lucide-react";
// NOTE: adjust this relative path if apiUrl lives somewhere else in this
// project — it mirrors the "../apiUrl/apiUrl" pattern used by the admin panel.
import apiurl from "../../apiUrl/apiUrl";

interface QuickInquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  intendedCourse: string;
  message: string;
}

const EMPTY_FORM: QuickInquiryFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  intendedCourse: "",
  message: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-400 text-sm outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-colors";
const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";

// ---------------------------------------------------------------------------
// Quick inquiry modal — POST /study-in-uk (public endpoint, no auth required)
// A lighter version of the full form on the Study in UK page: enough fields
// to create the lead, full details can be filled in later by the advisor.
// ---------------------------------------------------------------------------
const QuickInquiryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState<QuickInquiryFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof QuickInquiryFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${apiurl.mainUrl}/study-in-uk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          intendedCourse: form.intendedCourse || undefined,
          message: form.message || undefined,
          howDidYouHear: "Website — Homepage Study in UK section",
        }),
      });

      if (!res.ok) {
        let msg = "Something went wrong. Please try again.";
        try {
          const body = await res.json();
          msg = body.error || body.message || msg;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="w-full max-w-md bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white font-display">
              Thanks — we've got your details
            </h3>
            <p className="text-sm text-slate-300">
              An admissions advisor will reach out shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60 inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Quick Inquiry
            </span>
            <h3 className="text-xl font-bold text-white font-display mb-1">
              Explore UK Study Opportunities
            </h3>
            <p className="text-xs text-slate-300 mb-5">
              Leave your details and an advisor will follow up with your pathway
              options.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="text-sm text-red-200 bg-red-950/50 border border-red-800/60 rounded-xl px-3.5 py-2.5">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First name *</label>
                  <input
                    className={inputClass}
                    value={form.firstName}
                    onChange={update("firstName")}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Last name *</label>
                  <input
                    className={inputClass}
                    value={form.lastName}
                    onChange={update("lastName")}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={update("email")}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <input
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={update("phone")}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Interested course</label>
                <input
                  className={inputClass}
                  placeholder="e.g. BA Business Management"
                  value={form.intendedCourse}
                  onChange={update("intendedCourse")}
                />
              </div>
              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  className={inputClass}
                  rows={3}
                  placeholder="Tell us about your goals..."
                  value={form.message}
                  onChange={update("message")}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting\u2026</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>

              <Link
                to="/study-in-uk#inquiry-form"
                onClick={onClose}
                className="block text-center text-xs text-slate-400 hover:text-cyan-300 pt-1"
              >
                Prefer the full form? View the Study in UK page instead
              </Link>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export const StudyUKSection: React.FC = () => {
  const [showQuickInquiry, setShowQuickInquiry] = useState(false);

  const pathways = [
    {
      icon: GraduationCap,
      title: "Undergraduate Degree Top-Up",
      description:
        "Complete our Level 4/5 Extended Diplomas (240 Credits) and transition directly into the final Year 3 (Top-Up) of a UK Bachelor Degree (BA/BSc Hons), saving over £15,000 in university tuition.",
    },
    {
      icon: Building,
      title: "Direct University Admissions (UCAS)",
      description:
        "As a registered UCAS center, we partner with premier UK universities across London, Manchester, Birmingham, and Scotland to secure your conditional and unconditional offers.",
    },
    {
      icon: FileCheck2,
      title: "CAS & Visa Compliance Auditing",
      description:
        "Complete guidance on financial maintenance rules (28-day bank rule), Statement of Purpose (SOP) writing, and mock genuine student visa interview coaching.",
    },
    {
      icon: Briefcase,
      title: "Graduate Route (2-Year Work Visa)",
      description:
        "International students completing a UK undergraduate or postgraduate degree qualify for the 2-year post-study Graduate Route Visa to work in the UK without employer sponsorship.",
    },
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
                Unlock world-class British qualifications through accelerated
                foundation diplomas, Level 5 university top-up routes, and
                comprehensive international student admission support.
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
              <button
                type="button"
                onClick={() => setShowQuickInquiry(true)}
                className="px-7 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore UK Study Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/study-in-uk"
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
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Fast-Track Degree Pathway
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Save 40% Tuition
                  </span>
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Level 5 Diploma + 1 Year University Top-Up
                </h4>
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

      <AnimatePresence>
        {showQuickInquiry && (
          <QuickInquiryModal onClose={() => setShowQuickInquiry(false)} />
        )}
      </AnimatePresence>
    </section>
  );
};

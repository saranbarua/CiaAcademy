import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
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
  PhoneCall,
  Loader2,
  Send,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useModal } from "../context/ModalContext";
import { CTASection } from "../components/home/CTASection";
// NOTE: adjust this relative path if apiUrl lives somewhere else in this
// project — it mirrors the "../apiUrl/apiUrl" pattern used by the admin panel.
import apiurl from "../apiUrl/apiUrl";

interface InquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  dateOfBirth: string;
  currentEducation: string;
  intendedCourse: string;
  englishProficiency: string;
  preferredStart: string;
  howDidYouHear: string;
  message: string;
}

const EMPTY_FORM: InquiryFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  nationality: "",
  dateOfBirth: "",
  currentEducation: "",
  intendedCourse: "",
  englishProficiency: "",
  preferredStart: "",
  howDidYouHear: "",
  message: "",
};

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-400 text-sm outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-colors";
const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";

// ---------------------------------------------------------------------------
// Inquiry form — POST /study-in-uk (public endpoint, no auth required)
// ---------------------------------------------------------------------------
const InquiryFormSection: React.FC = () => {
  const [form, setForm] = useState<InquiryFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof InquiryFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
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
          nationality: form.nationality || undefined,
          dateOfBirth: form.dateOfBirth
            ? new Date(form.dateOfBirth).toISOString()
            : undefined,
          currentEducation: form.currentEducation || undefined,
          intendedCourse: form.intendedCourse || undefined,
          englishProficiency: form.englishProficiency || undefined,
          preferredStart: form.preferredStart || undefined,
          howDidYouHear: form.howDidYouHear || undefined,
          message: form.message || undefined,
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
      setForm(EMPTY_FORM);
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
    <section
      id="inquiry-form"
      className="py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Get Started
          </span>
          <h2 className="text-3xl font-extrabold font-display tracking-tight text-white">
            Request Your Free Study in UK Consultation
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Tell us a bit about yourself and one of our admissions advisors will
            get back to you with a personalised pathway plan.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/5 border border-emerald-400/30 text-center space-y-3"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white font-display">
              Thanks — we've got your details
            </h3>
            <p className="text-sm text-slate-300">
              An advisor will reach out shortly. In the meantime, feel free to
              explore our courses.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-semibold text-cyan-300 hover:underline pt-2"
            >
              Submit another inquiry
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5"
          >
            {error && (
              <div className="text-sm text-red-200 bg-red-950/50 border border-red-800/60 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <label className={labelClass}>Nationality</label>
                <input
                  className={inputClass}
                  value={form.nationality}
                  onChange={update("nationality")}
                />
              </div>
              <div>
                <label className={labelClass}>Date of birth</label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dateOfBirth}
                  onChange={update("dateOfBirth")}
                />
              </div>
              <div>
                <label className={labelClass}>Current education</label>
                <input
                  className={inputClass}
                  placeholder="e.g. Bachelor's Degree"
                  value={form.currentEducation}
                  onChange={update("currentEducation")}
                />
              </div>
              <div>
                <label className={labelClass}>Intended course</label>
                <input
                  className={inputClass}
                  placeholder="e.g. BA Business Management"
                  value={form.intendedCourse}
                  onChange={update("intendedCourse")}
                />
              </div>
              <div>
                <label className={labelClass}>English proficiency</label>
                <input
                  className={inputClass}
                  placeholder="e.g. IELTS 6.5"
                  value={form.englishProficiency}
                  onChange={update("englishProficiency")}
                />
              </div>
              <div>
                <label className={labelClass}>Preferred start</label>
                <input
                  className={inputClass}
                  placeholder="e.g. September 2027"
                  value={form.preferredStart}
                  onChange={update("preferredStart")}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>How did you hear about us?</label>
                <select
                  className={inputClass}
                  value={form.howDidYouHear}
                  onChange={update("howDidYouHear")}
                >
                  <option value="" className="text-slate-900">
                    Select an option
                  </option>
                  <option value="Google" className="text-slate-900">
                    Google
                  </option>
                  <option value="Social Media" className="text-slate-900">
                    Social Media
                  </option>
                  <option value="Friend / Family" className="text-slate-900">
                    Friend / Family
                  </option>
                  <option value="Education Agent" className="text-slate-900">
                    Education Agent
                  </option>
                  <option value="Event" className="text-slate-900">
                    Event
                  </option>
                  <option value="Other" className="text-slate-900">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Tell us about your goals..."
                value={form.message}
                onChange={update("message")}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
          </form>
        )}
      </div>
    </section>
  );
};

export const StudyInUkPage: React.FC = () => {
  const { openBrochureModal, openAdvisorModal } = useModal();

  const [selectedPathway, setSelectedPathway] = useState<
    "topup" | "foundation" | "master"
  >("topup");

  const comparisonData = [
    {
      metric: "Standard 3-Year UK University Route",
      cost: "£45,000 - £60,000 Total Tuition",
      duration: "3 Years Full-Time",
      qualification: "BSc / BA (Hons)",
      structure: "Year 1 + Year 2 + Year 3 at University Campus",
    },
    {
      metric: "Care International  Academy Fast-Track Top-Up Route",
      cost: "£14,500 - £18,000 Total Tuition (Save over £25,000)",
      duration: "2 Years Total (Fast-Tracked)",
      qualification: "BSc / BA (Hons) from Partner UK University",
      structure:
        "Year 1 & 2 at Care International  Academy (240 Ofqual Credits) + Final Year 3 at University",
    },
  ];

  return (
    <>
      <SEOHead
        title="Study in the UK | Fast-Track Degree Top-Up & University Pathways | Care International  Academy"
        description="Earn an accredited British Bachelor or Master Degree through Care International  Academy's Level 4 & 5 Extended Diplomas and direct UK University Top-Up partnerships."
        keywords="study in UK, top up degree UK, bachelor degree fast track London, Level 5 diploma university progression, UK university pathways"
        canonicalUrl="https://Care International academy.ac.uk/study-in-uk"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "Study in the UK" }]} />

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
                Save up to 40% on standard UK university tuition while studying
                in Central London. Progress seamlessly from Level 4/5 Ofqual
                diplomas directly into the final year of a UK Bachelor's Honours
                degree.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#inquiry-form"
                  className="px-6 py-3.5 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
                >
                  Apply for Degree Pathway
                </a>
                <button
                  onClick={() => openAdvisorModal("Study in UK Pathway")}
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
                  <li>
                    • Pay full high international university fees for all 3
                    years
                  </li>
                  <li>• High entry IELTS hurdles (typically 6.5 minimum)</li>
                  <li>• Massive lecture halls with 200+ students</li>
                </ul>
              </div>

              {/* Care International  Fast-Track */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 to-violet-950 text-white border-2 border-indigo-500 shadow-2xl space-y-4 relative">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400 text-slate-950 inline-block">
                  Recommended Care International Route
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
                  <li>
                    • Complete Years 1 & 2 at Care International Academy (240
                    Ofqual Credits)
                  </li>
                  <li>
                    • Direct entry into final Year 3 (Top-Up) at top UK
                    Universities
                  </li>
                  <li>• Small class sizes with personalized 1-on-1 tutoring</li>
                  <li>• Graduate with the exact same BA/BSc (Hons) degree</li>
                  <li>
                    • Full 2-Year Graduate Route Post-Study Work Visa
                    eligibility
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form — POST /study-in-uk */}
        <InquiryFormSection />

        {/* CTA */}
        <CTASection />
      </div>
    </>
  );
};

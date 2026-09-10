import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useModal } from "../../context/ModalContext";

export const Footer: React.FC = () => {
  const { openBrochureModal, openAdvisorModal } = useModal();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-950/90 text-slate-300 border-t border-white/10 backdrop-blur-2xl relative overflow-hidden">
      {/* Background Frosted Glass ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Contact Info (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 border border-white/20">
                <GraduationCap className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <span className="text-xl font-extrabold font-display tracking-tight text-white block">
                  Care International{" "}
                  <span className="text-cyan-400">ACADEMY</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 block -mt-0.5">
                  UK Professional & Higher Education
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Care International Academy of Professional Education is a premier
              UK training institution offering accredited qualifications in
              Security (SIA), Construction (CSCS), Health & Social Care,
              Business Leadership, and International Higher Education Pathways.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                  Care International Education Campus, 45 Commercial Road,
                  London E1 1LA, United Kingdom
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+44 (0) 20 8123 4567 / +44 (0) 7912 345678</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>admissions@Care International academy.ac.uk</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Mon – Fri: 09:00 - 18:00 | Sat: 10:00 - 16:00</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={() => openAdvisorModal()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-300 text-xs font-bold transition-all shadow-xs"
              >
                Request Free Callback
              </button>
              <button
                onClick={() => openBrochureModal()}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-bold transition-all shadow-xs"
              >
                Download 2026 Prospectus
              </button>
            </div>
          </div>

          {/* Column 2: Popular Courses */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
              Accredited Courses
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses/security/sia-door-supervisor-course"
                  className="hover:text-cyan-400 transition-colors"
                >
                  SIA Door Supervisor
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/security/sia-cctv-operator-course"
                  className="hover:text-cyan-400 transition-colors"
                >
                  SIA CCTV Operations
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/construction/cscs-green-card-course-package"
                  className="hover:text-cyan-400 transition-colors"
                >
                  CSCS Green Card Package
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/construction/sssts-site-supervisors-safety-training-scheme"
                  className="hover:text-cyan-400 transition-colors"
                >
                  CITB SSSTS Site Safety
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/health-social-care/level-3-diploma-adult-care-health-social"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Level 3 Diploma in Care
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/business/level-5-diploma-business-management-leadership"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Level 5 Business Leadership
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/english/ielts-academic-general-masterclass-band-7-plus"
                  className="hover:text-cyan-400 transition-colors"
                >
                  IELTS Band 7.5+ Masterclass
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/professional-qualifications/acca-accounting-foundation-applied-knowledge"
                  className="hover:text-cyan-400 transition-colors"
                >
                  ACCA Accounting Course
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Study in UK & International */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
              Study in the UK
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/study-in-uk"
                  className="hover:text-cyan-400 transition-colors"
                >
                  UK University Pathways
                </Link>
              </li>
              <li>
                <Link
                  to="/study-in-uk"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Bachelor Degree Top-Up
                </Link>
              </li>
              <li>
                <Link
                  to="/international-students"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Student Route Visa Guidance
                </Link>
              </li>
              <li>
                <Link
                  to="/international-students"
                  className="hover:text-cyan-400 transition-colors"
                >
                  CAS & Document Verification
                </Link>
              </li>
              <li>
                <Link
                  to="/international-students"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Country-Specific Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/student-support"
                  className="hover:text-cyan-400 transition-colors"
                >
                  London Accommodation Help
                </Link>
              </li>
              <li>
                <Link
                  to="/student-support"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Graduate Route Post-Study Visa
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-display">
              Intake Alerts & Updates
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to get notified of upcoming batch dates, discount
              vouchers, and UK visa policy updates.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Thank you! You are on our VIP intake alert list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20"
                >
                  Join Intake Newsletter
                </button>
              </form>
            )}

            <div className="pt-2">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Academy Resources
              </h5>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link to="/about" className="text-slate-400 hover:text-white">
                  About
                </Link>
                <span>•</span>
                <Link
                  to="/admissions"
                  className="text-slate-400 hover:text-white"
                >
                  Admissions
                </Link>
                <span>•</span>
                <Link to="/blog" className="text-slate-400 hover:text-white">
                  Blog
                </Link>
                <span>•</span>
                <Link to="/faq" className="text-slate-400 hover:text-white">
                  FAQ
                </Link>
                <span>•</span>
                <Link to="/contact" className="text-slate-400 hover:text-white">
                  Campus Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations Trust Strip in Footer */}
        <div className="py-6 border-t border-b border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold text-slate-200">
              Accredited & Regulated Qualifications:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Ofqual Regulated
            </span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              SIA Licenced Training
            </span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Highfield Approved
            </span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              CITB Site Safety
            </span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              CPD Certified
            </span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              British Council Agent
            </span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} Care International Academy of
            Professional Education. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/faq" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/faq" className="hover:text-slate-400 transition-colors">
              Cookie Policy
            </Link>
            <Link to="/faq" className="hover:text-slate-400 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

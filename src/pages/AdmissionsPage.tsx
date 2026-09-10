import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileCheck,
  CreditCard,
  HelpCircle,
  CheckCircle2,
  Download,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useModal } from "../context/ModalContext";
import { CTASection } from "../components/home/CTASection";

export const AdmissionsPage: React.FC = () => {
  const { openAdvisorModal, openBrochureModal } = useModal();

  const intakes = [
    {
      term: "Autumn Intake 2026",
      status: "Open for Registration (High Demand)",
      startDate: "15 September 2026",
      deadline: "31 August 2026",
      type: "All Vocational, Professional & Degree Top-Up Courses",
    },
    {
      term: "Winter Intake 2026/27",
      status: "Admissions Open",
      startDate: "10 November 2026",
      deadline: "25 October 2026",
      type: "SIA, CSCS, Care Diplomas & IELTS Batches",
    },
    {
      term: "Spring Intake 2027",
      status: "Early Bird Registration Open",
      startDate: "18 January 2027",
      deadline: "05 January 2027",
      type: "All Higher Education Diplomas & Top-Up Routes",
    },
    {
      term: "Weekly Vocational Intakes",
      status: "Ongoing Continuous Intakes",
      startDate: "Every Monday & Wednesday",
      deadline: "Rolling 48-Hour Enrolment",
      type: "SIA Door Supervisor, CCTV, CSCS Green Card",
    },
  ];

  return (
    <>
      <SEOHead
        title="Admissions & Intakes 2026/2027 | Care International  Academy London"
        description="Explore upcoming intake dates, entry requirements, payment plans, and step-by-step application instructions for UK professional courses and higher education."
        keywords="Care International  Academy admissions, UK course intakes 2026, SIA intake London, university top up application, student payment plans"
        canonicalUrl="https://Care International academy.ac.uk/admissions"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "Admissions & Intakes" }]} />

        {/* Hero */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block">
                Admissions Open 2026 / 2027
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Simple, Fast & Transparent Admissions
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Whether enrolling in our weekly SIA or CSCS fast-track batches
                or applying for our autumn/spring university top-up diplomas,
                our admissions officers are here to support you at every
                milestone.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/apply"
                  className="px-6 py-3.5 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-lg"
                >
                  Start Online Application
                </Link>
                <button
                  onClick={() => openAdvisorModal("Admissions Query")}
                  className="px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  Request Callback from Admissions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Intakes Calendar */}
        <section className="py-16 bg-white dark:bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-2">
                Calendar
              </span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Upcoming Academic & Vocational Intakes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {intakes.map((intake) => (
                <div
                  key={intake.term}
                  className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                      {intake.status}
                    </span>
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {intake.term}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <strong>Applicable For:</strong> {intake.type}
                  </p>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span>
                      <strong>Starts:</strong> {intake.startDate}
                    </span>
                    <span>
                      <strong>Deadline:</strong> {intake.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Plans & 0% Finance */}
        <section className="py-16 bg-slate-50 dark:bg-[#0E1322]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-violet-950 text-white border border-indigo-700/60 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Flexible Financing
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display">
                  0% Interest Student Instalment Plans Available
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We believe financial constraints should never hold you back.
                  Pay a small registration deposit upon enrollment, and spread
                  the remainder across manageable monthly instalments with zero
                  interest charges.
                </p>
              </div>
              <div className="lg:col-span-4 text-center lg:text-right">
                <button
                  onClick={() => openAdvisorModal("Instalment Plan Inquiry")}
                  className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all"
                >
                  Inquire About Payment Plans
                </button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
};

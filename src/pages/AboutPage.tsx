import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Award,
  Users,
  Target,
  Eye,
  CheckCircle2,
  MapPin,
  Play,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useModal } from "../context/ModalContext";
import { TrustPartners } from "../components/home/TrustPartners";
import { CTASection } from "../components/home/CTASection";

export const AboutPage: React.FC = () => {
  const { openVideoModal, openAdvisorModal } = useModal();

  const values = [
    {
      title: "Academic Rigor & Compliance",
      description:
        "We uphold strict Ofqual and SIA quality benchmarks, ensuring genuine assessment integrity and accredited recognition across the UK.",
      icon: ShieldCheck,
    },
    {
      title: "Practical Career Readiness",
      description:
        "Our curriculum goes beyond textbook theory to include real equipment handling, emergency scenario simulations, and employer workshops.",
      icon: Target,
    },
    {
      title: "Global Inclusivity & Support",
      description:
        "We celebrate a diverse student community representing over 40 nationalities with dedicated visa, housing, and pastoral guidance.",
      icon: Users,
    },
    {
      title: "Empowerment & Progression",
      description:
        "From entry-level licence training to full Bachelor/Master degrees, we provide accessible laddered qualification pathways.",
      icon: Award,
    },
  ];

  const faculty = [
    {
      name: "Dr. Marcus Vance",
      role: "Dean of Higher Education Pathways",
      credentials: "PhD (Oxford), FHEA, Former UCAS Admissions Committee",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Elena Rostova",
      role: "Head of Security & Tactical Operations",
      credentials: "20+ Yrs UK Close Protection & SIA Master Trainer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "David O'Connor",
      role: "Director of Health & Social Care Faculty",
      credentials: "MSc Clinical Nursing, NHS Leadership Fellow",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sarah Jenkins",
      role: "Lead English Language & IELTS Examiner",
      credentials:
        "MA Applied Linguistics (UCL), Certified British Council Trainer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <>
      <SEOHead
        title="About Care International  Academy | Leading UK Accredited Training & Higher Education"
        description="Learn about Care International  Academy's mission, Ofqual accreditation, central London campus facilities, and experienced academic faculty."
        keywords="about Care International  Academy, UK education academy, Ofqual accredited training centre London, SIA training provider"
        canonicalUrl="https://Care International academy.ac.uk/about"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
        <Breadcrumbs items={[{ label: "About Academy" }]} />

        {/* Hero Section */}
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-[#0B0F19] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block">
                  About Care International Academy
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                  Empowering Futures Through Accredited UK Education
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Founded in London with a vision to make regulated British
                  qualifications accessible, rigorous, and career-transforming,
                  Care International Academy has trained over 5,000 students and
                  professionals.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => openVideoModal()}
                    className="px-6 py-3.5 rounded-xl font-bold bg-white text-slate-950 hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-current text-indigo-600" />
                    <span>Watch Academy Story</span>
                  </button>
                  <Link
                    to="/courses"
                    className="px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 transition-colors"
                  >
                    Explore Course Catalog
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 aspect-[4/3.5]">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                    alt="Care International  Academy Lecture Theatre"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <p className="font-bold text-white">
                      Central London Campus
                    </p>
                    <p className="text-slate-400">
                      45 Commercial Road, London E1 1LA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditations Marquee Strip */}
        <TrustPartners />

        {/* Mission & Vision Section */}
        <section className="py-20 bg-white dark:bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="p-8 rounded-3xl bg-indigo-50/60 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  To deliver highest-standard, career-focused, and regulated
                  vocational and higher education qualifications that equip
                  individuals with practical mastery, legal compliance, and
                  long-term career mobility.
                </p>
              </div>

              {/* Vision */}
              <div className="p-8 rounded-3xl bg-cyan-50/60 dark:bg-slate-800/80 border border-cyan-100 dark:border-slate-700 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  To be the UK's most trusted gateway for professional licencing
                  and international university progression, recognised globally
                  for academic excellence, ethical admissions, and student
                  outcome benchmarks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-20 bg-slate-50 dark:bg-[#0E1322]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-3">
                Core Principles
              </span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                What Drives Everything We Do
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                      {v.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Faculty Leadership */}
        <section className="py-20 bg-white dark:bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-3">
                Expert Faculty
              </span>
              <h2 className="text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                Learn Directly from Industry Leaders
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                Our tutors bring decades of frontline UK field experience, PhD
                scholarship, and official examining credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {faculty.map((member) => (
                <div
                  key={member.name}
                  className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="aspect-square overflow-hidden bg-slate-200 dark:bg-slate-700">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pt-1">
                      {member.credentials}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </div>
    </>
  );
};

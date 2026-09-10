import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  Users,
  Award,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  MapPin,
} from "lucide-react";
import { useModal } from "../../context/ModalContext";

export const Hero: React.FC = () => {
  const { openVideoModal, openAdvisorModal } = useModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const floatingCardVariants = {
    initial: { y: 0 },
    animate: (custom: number) => ({
      y: [0, custom, 0],
      transition: {
        duration: 4.5 + Math.abs(custom) * 0.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section className="relative pt-6 pb-20 md:py-24 overflow-hidden">
      {/* Ambient Glass Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[420px] h-[420px] bg-indigo-300/30 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-8 w-[400px] h-[400px] bg-violet-300/25 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-12 w-[380px] h-[380px] bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* 1. Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-xs">
                <Sparkles
                  className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400 animate-spin"
                  style={{ animationDuration: "8s" }}
                />
                <span>UK OFQUAL & SIA REGULATED QUALIFICATIONS</span>
              </div>
            </motion.div>

            {/* 2. Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              Build Your Future With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400">
                Professional Education
              </span>
            </motion.h1>

            {/* 3. Supporting Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Fast-track your career with industry-recognized certifications in{" "}
              <strong>Security (SIA)</strong>,{" "}
              <strong>Construction (CSCS),</strong>,{" "}
              <strong>professional training</strong>,{" "}
              <strong>UK University Pathways</strong>.
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2"
            >
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-xl shadow-indigo-200/80 dark:shadow-indigo-950/60 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                id="hero-explore-courses-btn"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl font-bold text-slate-800 dark:text-slate-100 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:bg-white/95 dark:hover:bg-slate-750 shadow-sm hover:shadow-md transition-all"
                id="hero-apply-now-btn"
              >
                Apply Online
              </Link>

              <button
                onClick={() => openAdvisorModal()}
                className="inline-flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 transition-colors gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                <span>Talk to an Advisor</span>
              </button>
            </motion.div>

            {/* 5. Key Trust Metrics Strip in Glass Panel */}
            <motion.div
              variants={itemVariants}
              className="pt-5 grid grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div>
                <div className="flex items-center text-slate-900 dark:text-white font-extrabold text-xl sm:text-2xl font-display">
                  <span>95%</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  First-Time Pass Rate
                </p>
              </div>

              <div>
                <div className="flex items-center text-slate-900 dark:text-white font-extrabold text-xl sm:text-2xl font-display">
                  <span>5,000+</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Graduates Certified
                </p>
              </div>

              <div>
                <div className="flex items-center text-amber-500 font-extrabold text-xl sm:text-2xl font-display">
                  <span>4.9/5</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 ml-1 inline" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Student Reviews
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Visual Area with Floating Frosted Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              variants={itemVariants}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 aspect-[4/5] sm:aspect-[4/4.5] group backdrop-blur-xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                  alt="Care International  Academy Students in London"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Bottom Campus Badge Info (Glassmorphic) */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Ilford Campus
                      </span>
                    </div>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                      Weekly Intakes
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-indigo-500 flex-shrink-0" />
                    : Lex House, 1-7 Hainault Street, Ilford • Weekly Intakes
                  </p>
                </div>

                {/* Interactive Play Video Button Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <button
                    onClick={() => openVideoModal()}
                    className="group/btn relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl text-indigo-600 dark:text-cyan-400 shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all border border-white/80 dark:border-white/20"
                    aria-label="Play Academy Tour Video"
                    id="hero-play-video-btn"
                  >
                    <span className="absolute inset-0 rounded-full bg-indigo-500/25 animate-ping pointer-events-none" />
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                  </button>
                </div>
              </div>

              {/* Floating Frosted Badge 1: 5,000+ Students (Top Left) */}
              <motion.div
                custom={-10}
                variants={floatingCardVariants}
                initial="initial"
                animate="animate"
                className="absolute -top-4 -left-4 sm:-left-8 p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-slate-800/85 shadow-2xl border border-white/90 dark:border-white/15 flex items-center space-x-3 z-20 backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    5,000+ Students
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Certified & Placed
                  </p>
                </div>
              </motion.div>

              {/* Floating Frosted Badge 2: UK Recognised Training (Bottom Right) */}
              <motion.div
                custom={10}
                variants={floatingCardVariants}
                initial="initial"
                animate="animate"
                className="absolute -bottom-6 -right-4 sm:-right-6 p-3 sm:p-3.5 rounded-2xl bg-white/85 dark:bg-slate-800/85 shadow-2xl border border-white/90 dark:border-white/15 flex items-center space-x-3 z-20 backdrop-blur-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    UK Recognised
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Ofqual & SIA Standards
                  </p>
                </div>
              </motion.div>

              {/* Floating Frosted Badge 3: 4.9/5 Rating (Top Right) */}
              <motion.div
                custom={-8}
                variants={floatingCardVariants}
                initial="initial"
                animate="animate"
                className="hidden sm:flex absolute top-12 -right-6 p-2.5 rounded-2xl bg-white/85 dark:bg-slate-800/85 shadow-xl border border-white/90 dark:border-white/15 items-center space-x-2 z-20 backdrop-blur-xl"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    4.9 / 5.0
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                    Verified Reviews
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

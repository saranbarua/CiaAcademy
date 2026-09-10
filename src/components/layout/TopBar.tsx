import React from "react";
import { Phone, Mail, Clock, Sparkles, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

export const TopBar: React.FC = () => {
  const { openAdvisorModal } = useModal();

  return (
    <div className="bg-indigo-950/90 dark:bg-slate-950/90 backdrop-blur-md text-slate-200 text-xs py-2.5 px-4 border-b border-indigo-900/40 dark:border-slate-800/60 hidden sm:block relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Animated Announcement */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3 mr-1 text-cyan-300 animate-pulse" />
            Admissions Open
          </span>
          <span className="text-slate-200 font-medium truncate max-w-md lg:max-w-xl">
            Admissions Open for Winter & Spring Intakes — UK Accredited SIA,
            CSCS, Care & Degree Pathways
          </span>
        </div>

        {/* Right: Contact & Action Links */}
        <div className="flex items-center space-x-5 flex-shrink-0 font-medium">
          <a
            href="tel:07495922582"
            className="flex items-center text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            <span>07495922582</span>
          </a>

          <a
            href="mailto:admissions@Care International academy.ac.uk"
            className="hidden md:flex items-center text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            <span className="mr-2">info@careintltd.co.uk,</span>{" "}
            <span> info@ciacademy.ac</span>
          </a>

          <button
            onClick={() => openAdvisorModal()}
            className="text-cyan-300 hover:text-cyan-200 font-semibold hover:underline flex items-center"
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            Free Advisor Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

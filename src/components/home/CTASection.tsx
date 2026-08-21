import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Download,
  PhoneCall,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export const CTASection: React.FC = () => {
  const { openBrochureModal, openAdvisorModal } = useModal();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-violet-950/90 backdrop-blur-2xl text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/20"
        >
          {/* Background Decorative Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Autumn & Spring Intakes Registering Now</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Ready to Advance Your Qualifications & Career?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Join thousands of certified professionals. Enroll in our next upcoming weekday or weekend batch, or speak with an advisor about degree top-up pathways.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/apply"
                className="px-8 py-4 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                id="cta-apply-now"
              >
                <span>Apply Online Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => openBrochureModal()}
                className="px-7 py-4 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 shadow-xs"
                id="cta-download-prospectus"
              >
                <Download className="w-4 h-4 text-cyan-300" />
                <span>Download Prospectus</span>
              </button>

              <button
                onClick={() => openAdvisorModal()}
                className="px-6 py-4 rounded-2xl font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                id="cta-speak-advisor"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Request Free Callback</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>0% Interest Payment Plans</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Central London Location</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Ofqual Regulated Certifications</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

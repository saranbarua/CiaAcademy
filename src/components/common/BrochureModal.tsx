import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, FileText, CheckCircle2, Mail, User, Phone } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import confetti from 'canvas-confetti';

export const BrochureModal: React.FC = () => {
  const { isBrochureModalOpen, closeBrochureModal, brochureCourseName } = useModal();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Simulate instant download trigger
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `APEX ACADEMY UK - OFFICIAL COURSE PROSPECTUS & SYLLABUS\n\nCourse: ${brochureCourseName || 'General Academy Prospectus 2026'}\nAccreditation: Highfield / Pearson / SIA / Ofqual\nTuition & Funding: Flexible 0% Interest Plans Available\nCampus Locations: Central London, Birmingham & Virtual Learning\nAdmissions Helpline: +44 (0) 20 8123 4567\nWebsite: https://apexacademy.ac.uk`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${(brochureCourseName || 'Apex_Academy_Prospectus').replace(/\s+/g, '_')}_Syllabus.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  const handleClose = () => {
    setDownloaded(false);
    closeBrochureModal();
  };

  return (
    <AnimatePresence>
      {isBrochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 dark:border-white/10 overflow-hidden z-10"
          >
            <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-violet-950/90 backdrop-blur-xl p-5 text-white relative border-b border-white/10">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                id="brochure-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-2xl bg-violet-600/30 border border-violet-400/30 flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-violet-300" />
              </div>
              <h3 className="text-lg font-bold font-display">Download Course Prospectus</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {brochureCourseName ? `Full syllabus & module breakdown for: ${brochureCourseName}` : 'Download the complete 2026 Course Directory and Fee Schedule.'}
              </p>
            </div>

            {downloaded ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Download Started!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  A digital copy of the syllabus has been sent to <span className="font-semibold text-slate-900 dark:text-white">{email}</span> and downloaded to your device.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="p-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      required
                      type="text"
                      placeholder="Alex Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Email Address (To Receive PDF) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      required
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+44 7123 456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download Free Syllabus PDF
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

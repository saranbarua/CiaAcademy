import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PhoneCall, CheckCircle2, MessageSquare, Clock, User, Mail, Phone, GraduationCap } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import confetti from 'canvas-confetti';

export const AdvisorModal: React.FC = () => {
  const { isAdvisorModalOpen, closeAdvisorModal, advisorCourseName } = useModal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: advisorCourseName || 'SIA Door Supervisor Licence',
    preferredTime: 'Morning (09:00 - 12:00)',
    contactMethod: 'Phone Call',
    question: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    closeAdvisorModal();
  };

  return (
    <AnimatePresence>
      {isAdvisorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAdvisorModal}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 dark:border-white/10 overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-violet-950/90 backdrop-blur-xl p-6 text-white relative border-b border-white/10">
              <button
                onClick={closeAdvisorModal}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                id="advisor-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                <PhoneCall className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold font-display">Talk to a Course Advisor</h3>
              <p className="text-sm text-slate-300 mt-1">
                Get free, tailored guidance on course eligibility, funding options, dates, or visa pathways within 30 minutes.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  Callback Request Confirmed!
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.name}</span>. A senior academic advisor will reach out via <span className="font-medium text-indigo-600 dark:text-indigo-400">{formData.contactMethod}</span> at {formData.preferredTime}.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p><span className="font-medium text-slate-700 dark:text-slate-300">Course Selected:</span> {formData.course}</p>
                  <p><span className="font-medium text-slate-700 dark:text-slate-300">Phone:</span> {formData.phone || 'Provided via form'}</p>
                  <p><span className="font-medium text-slate-700 dark:text-slate-300">Direct Helpline:</span> +44 (0) 20 8123 4567</p>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Tariq Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        required
                        type="tel"
                        placeholder="+44 7123 456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Course of Interest
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="SIA Door Supervisor Licence">SIA Door Supervisor Licence</option>
                      <option value="SIA CCTV Public Space Surveillance">SIA CCTV Operator Course</option>
                      <option value="CSCS Green Card Package">CSCS Green Card (Level 1 H&S)</option>
                      <option value="CITB SSSTS Site Supervisors">CITB SSSTS Site Safety</option>
                      <option value="Level 5 Diploma in Business & Leadership">Level 5 Diploma in Business (University Fast-Track)</option>
                      <option value="Level 3 Diploma in Adult Care">Level 3 Diploma in Adult Care (RQF)</option>
                      <option value="IELTS Academic Masterclass">IELTS Academic Masterclass (Band 7.5+)</option>
                      <option value="ACCA Accounting Foundation">ACCA Foundation in Accountancy</option>
                      <option value="Study in UK / University Admission">Study in the UK / University Admissions</option>
                      <option value="General Course Guidance">General Course Guidance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Contact Method
                    </label>
                    <select
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Phone Call">Direct Phone Call</option>
                      <option value="WhatsApp">WhatsApp Chat</option>
                      <option value="Email">Detailed Email</option>
                      <option value="Zoom Meeting">1-on-1 Zoom Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Best Time to Call
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Immediately (Next 30 mins)">Immediately (Next 30 mins)</option>
                      <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                      <option value="Afternoon (12:00 - 17:00)">Afternoon (12:00 - 17:00)</option>
                      <option value="Evening (17:00 - 19:30)">Evening (17:00 - 19:30)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Any specific questions? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Are weekend batches available? Can I pay in instalments?"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
                  id="advisor-form-submit"
                >
                  Request Advisor Callback
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

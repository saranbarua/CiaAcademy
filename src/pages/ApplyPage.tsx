import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  FileCheck,
  CreditCard,
  User,
  GraduationCap,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Upload,
  ShieldCheck,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { coursesData } from '../data/coursesData';

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [step, setStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [applicationRef, setApplicationRef] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    courseTitle: preselectedCourse || coursesData[0].title,
    studyMode: 'Classroom (Central London Campus)',
    preferredIntake: 'Autumn Intake (September 2026)',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    nationality: 'United Kingdom',
    currentEducation: 'Secondary School (GCSE / Equivalent)',
    hasEnglishProficiency: 'Yes',
    paymentPlan: 'Full Payment (10% Discount Applied)',
    termsAccepted: false
  });

  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, courseTitle: preselectedCourse }));
    }
  }, [preselectedCourse]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      // Final Submit
      const randomRef = 'APX-' + Math.floor(100000 + Math.random() * 900000);
      setApplicationRef(randomRef);
      setIsCompleted(true);

      // Trigger Confetti effect
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        title="Apply Online | Student Admission & Enrolment | Apex Academy"
        description="Submit your online course application for accredited UK qualifications in SIA Security, CITB Construction, Care Diplomas, and University Degree Top-Up."
        keywords="apply Apex Academy, student enrolment London, online course application, SIA registration"
        canonicalUrl="https://apexacademy.ac.uk/apply"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: 'Online Application' }]} />

        {/* Hero */}
        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                Official Enrolment Portal
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                Apex Academy Application Form
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                Fast 3-step application. Receive your provisional admission offer and batch confirmation in minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Step Indicator */}
          {!isCompleted && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[
                  { num: 1, label: 'Course Selection' },
                  { num: 2, label: 'Personal Details' },
                  { num: 3, label: 'Payment & Confirm' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        step >= s.num
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                    </div>
                    <span className={`text-xs font-semibold hidden sm:inline ${step >= s.num ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
            {isCompleted ? (
              /* Success Submission View */
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Application Submitted Successfully
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    Welcome to Apex Academy!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    We have received your application for <strong>{formData.courseTitle}</strong>.
                  </p>
                </div>

                {/* Reference Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-400 uppercase">Application Ref:</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{applicationRef}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Applicant:</span>
                    <strong className="text-slate-900 dark:text-white">{formData.firstName} {formData.lastName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <strong className="text-slate-900 dark:text-white">{formData.email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Intake:</span>
                    <strong className="text-slate-900 dark:text-white">{formData.preferredIntake}</strong>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Return to Home
                  </Link>
                  <Link
                    to="/student-support"
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
                  >
                    Explore Student Support
                  </Link>
                </div>
              </div>
            ) : (
              /* Multi-Step Form */
              <form onSubmit={handleNext} className="space-y-6">
                {/* STEP 1: Course & Intake Selection */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                      Step 1: Qualification & Timetable Selection
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Select Course / Qualification *
                      </label>
                      <select
                        value={formData.courseTitle}
                        onChange={(e) => setFormData({ ...formData, courseTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                      >
                        {coursesData.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title} (£{c.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Study Mode *
                        </label>
                        <select
                          value={formData.studyMode}
                          onChange={(e) => setFormData({ ...formData, studyMode: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Classroom (Central London Campus)">Classroom (Central London Campus)</option>
                          <option value="Online / Distance Learning">Online / Distance Learning</option>
                          <option value="Weekend Intensive Batch">Weekend Intensive Batch</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Preferred Intake *
                        </label>
                        <select
                          value={formData.preferredIntake}
                          onChange={(e) => setFormData({ ...formData, preferredIntake: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Upcoming Monday Batch (Fast-Track)">Upcoming Monday Batch (Fast-Track)</option>
                          <option value="Autumn Intake (September 2026)">Autumn Intake (September 2026)</option>
                          <option value="Winter Intake (November 2026)">Winter Intake (November 2026)</option>
                          <option value="Spring Intake (January 2027)">Spring Intake (January 2027)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Personal & Contact Information */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                      Step 2: Personal & Contact Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="e.g. John"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="e.g. Smith"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john.smith@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number (UK or Int.) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+44 7123 456789"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Nationality *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          placeholder="e.g. British, Bangladeshi, Nigerian..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Payment Plan & Confirmation */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                      Step 3: Tuition Fee Payment Plan & Confirmation
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Select Payment Preference *
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          { id: 'Full Payment (10% Discount Applied)', label: 'Pay in Full (10% Early Bird Discount Applied)' },
                          { id: 'Deposit Only (£99 To Secure Seat)', label: 'Pay £99 Seat Deposit (Remainder due on day 1)' },
                          { id: '0% Interest Monthly Instalment Plan', label: '3-Month 0% Interest Instalment Plan' }
                        ].map((plan) => (
                          <label
                            key={plan.id}
                            className={`p-3.5 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                              formData.paymentPlan === plan.id
                                ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentPlan"
                              checked={formData.paymentPlan === plan.id}
                              onChange={() => setFormData({ ...formData, paymentPlan: plan.id })}
                              className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {plan.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          required
                          checked={formData.termsAccepted}
                          onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                          className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>
                          I agree to Apex Academy's Terms of Enrolment, Privacy Policy, and confirm all submitted personal information is accurate.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2"
                  >
                    <span>{step === 3 ? 'Confirm & Submit Enrolment' : 'Continue to Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

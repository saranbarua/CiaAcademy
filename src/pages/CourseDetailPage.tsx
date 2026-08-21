import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Calendar,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Star,
  Download,
  Share2,
  FileText,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronDown,
  UserCheck,
  Building2,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { coursesData } from '../data/coursesData';
import { useModal } from '../context/ModalContext';

export const CourseDetailPage: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const { openBrochureModal, openAdvisorModal } = useModal();

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'requirements' | 'schedule' | 'faqs'>('overview');
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [selectedBatch, setSelectedBatch] = useState<string>('');

  const course = coursesData.find((c) => c.slug === slug || (c.category === category && c.slug === slug));

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">Qualification Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested course could not be located in our directory.</p>
        <Link to="/courses" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl">
          Browse All Courses
        </Link>
      </div>
    );
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Apex Academy of Professional Education',
      sameAs: 'https://apexacademy.ac.uk'
    },
    educationalCredentialAwarded: course.awardingBody,
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'GBP',
      category: 'Paid',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <>
      <SEOHead
        title={`${course.title} | UK Regulated Qualification | Apex Academy`}
        description={course.shortDescription}
        keywords={`${course.title}, ${course.awardingBody}, ${course.categoryName}, SIA licence London, Ofqual qualifications`}
        canonicalUrl={`https://apexacademy.ac.uk/courses/${course.category}/${course.slug}`}
        schemaJson={courseSchema}
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-24">
        <Breadcrumbs
          items={[
            { label: 'Courses', path: '/courses' },
            { label: course.categoryName, path: `/courses/${course.category}` },
            { label: course.title }
          ]}
        />

        {/* Course Header Banner */}
        <section className="py-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400 text-slate-950">
                    {course.categoryName}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/20">
                    {course.level}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {course.awardingBody} Regulated
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                  {course.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  {course.shortDescription}
                </p>

                {/* Meta stats bar */}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal ml-1">({course.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>{course.studyMode}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>{course.enrolledCount}+ Enrolled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area: Left Tab Content + Right Sticky Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Tab Navigation Navigation Pill */}
              <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'overview', label: 'Course Overview' },
                  { id: 'syllabus', label: `Syllabus (${course.modules.length} Modules)` },
                  { id: 'requirements', label: 'Entry Requirements' },
                  { id: 'schedule', label: 'Upcoming Batches' },
                  { id: 'faqs', label: 'Course FAQs' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-8 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
                      About This Qualification
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {course.fullDescription}
                    </p>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
                      What You Will Learn & Master
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Opportunities */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
                      Career Outcomes & Potential Salaries
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
                      Graduates of this qualification are in high demand across the UK:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.careerOpportunities.map((opp, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between"
                        >
                          <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">{opp.role}</span>
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{opp.avgSalary}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assessment Method & Certificate */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 dark:from-slate-900 dark:to-indigo-950/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Assessment & Awarding Body</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      <strong>Method:</strong> {course.assessmentMethod}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      <strong>Awarding Organisation:</strong> {course.awardingBody} (Regulated by Ofqual)
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Syllabus Modules */}
              {activeTab === 'syllabus' && (
                <div className="space-y-4 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      Curriculum Syllabus & Units
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Comprehensive module-by-module breakdown designed to meet official regulated specifications.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {course.modules.map((mod, idx) => {
                      const isOpen = openModuleIndex === idx;
                      return (
                        <div
                          key={mod.title}
                          className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
                        >
                          <button
                            onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                            className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <span>{mod.title}</span>
                                <span className="text-[11px] text-slate-400 font-normal ml-2">({mod.duration})</span>
                              </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 space-y-2">
                                  {mod.topics && (
                                    <div className="pt-2">
                                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">Key Topics Covered:</span>
                                      <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 pl-1">
                                        {mod.topics.map((t, tIdx) => (
                                          <li key={tIdx}>{t}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Entry Requirements */}
              {activeTab === 'requirements' && (
                <div className="space-y-6 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                      Eligibility & Entry Criteria
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Please ensure you meet the following baseline requirements before enrolling.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {course.entryRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300 flex items-start space-x-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Required ID Documents on First Day:</p>
                      <p className="mt-0.5">Valid Passport / UK Biometric Residence Permit (BRP) and proof of address dated within the last 3 months.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Upcoming Batches */}
              {activeTab === 'schedule' && (
                <div className="space-y-6 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                      Upcoming Class Dates & Intakes
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Select your preferred schedule to secure your seat.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {course.upcomingDates.map((batch, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedBatch(batch.date)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedBatch === batch.date
                            ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{batch.date}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{batch.location}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 mb-1">
                            {batch.seatsLeft} Seats Available
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Course FAQs */}
              {activeTab === 'faqs' && (
                <div className="space-y-4 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
                    Frequently Asked Questions about {course.title}
                  </h3>
                  <div className="space-y-3">
                    {course.faqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Booking Box */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-6">
                {/* Price Display */}
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Total Qualification Fee</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                      £{course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-slate-400 line-through font-medium">
                        £{course.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      VAT Included
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    0% interest instalments available (Pay deposit from £99)
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-2.5">
                  <Link
                    to={`/apply?course=${encodeURIComponent(course.title)}`}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Apply for this Qualification</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openAdvisorModal(course.title)}
                    className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Talk to Course Advisor</span>
                  </button>

                  <button
                    onClick={() => openBrochureModal()}
                    className="w-full py-2 px-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Syllabus PDF</span>
                  </button>
                </div>

                {/* Key Course Inclusions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Official Ofqual Regulated Certificate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Free Practice Mock Exam Portal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Free Re-sit Guarantee Included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Direct Upload to Licencing Body</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Post-Course Job Assistance Clinic</span>
                  </div>
                </div>

                {/* Campus Location */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Training Location:</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    Apex Education Centre, 45 Commercial Road, London E1 1LA (2 min from Aldgate East Station)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

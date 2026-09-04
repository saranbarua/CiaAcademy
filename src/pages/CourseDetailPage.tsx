import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Award,
  CheckCircle2,
  Users,
  Star,
  Download,
  ArrowRight,
  Building2,
  PhoneCall,
  MapPin,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useModal } from "../context/ModalContext";
import {
  averageRating,
  levelLabel,
  durationLabel,
  ApiCourse,
} from "../data/api/couAPi";
import apiurl from "../apiUrl/apiUrl";
import { CourseReviews } from "../components/course/CourseReviews";

const API_BASE = apiurl.mainUrl;

async function fetchCourseBySlug(slug: string): Promise<ApiCourse> {
  const res = await fetch(`${API_BASE}/courses/slug/${slug}`);
  if (!res.ok) throw new Error("This course could not be found.");
  return res.json();
}

function parseLines(text?: string): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded mb-2" />
      <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="lg:col-span-4 h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    </div>
  );
}

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ category: string; slug: string }>();
  const { openBrochureModal, openAdvisorModal } = useModal();

  const [course, setCourse] = useState<ApiCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "overview" | "syllabus" | "requirements" | "schedule"
  >("overview");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCourseBySlug(slug)
      .then((data) => !cancelled && setCourse(data))
      .catch(
        (err) =>
          !cancelled &&
          setError(err.message || "This course could not be found."),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <DetailSkeleton />;

  if (error || !course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">
          Qualification Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {error ||
            "The requested course could not be located in our directory."}
        </p>
        <Link
          to="/courses"
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl"
        >
          Browse All Courses
        </Link>
      </div>
    );
  }

  const rating = averageRating(course);
  const reviewCount = course._count?.reviews ?? 0;
  const bookingCount = course._count?.bookings ?? 0;
  const categoryName = course.category?.name ?? "Course";
  const categorySlug = course.category?.slug ?? "all";
  const requirementLines = parseLines(course.requirements);
  const schedules = Array.isArray(course.schedules) ? course.schedules : [];
  const includes = Array.isArray(course.includes) ? course.includes : [];
  const whatYouLearn = Array.isArray(course.whatYouLearn)
    ? course.whatYouLearn
    : [];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDescription,
    provider: {
      "@type": "Organization",
      name: "Apex Academy of Professional Education",
      sameAs: "https://apexacademy.ac.uk",
    },
    offers: {
      "@type": "Offer",
      price: course.discountedPrice ?? course.price,
      priceCurrency: "GBP",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <SEOHead
        title={`${course.title} | UK Regulated Qualification | Apex Academy`}
        description={course.shortDescription}
        keywords={`${course.title}, ${categoryName}, SIA licence London, Ofqual qualifications`}
        canonicalUrl={`https://apexacademy.ac.uk/courses/${categorySlug}/${course.slug}`}
        schemaJson={courseSchema}
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-24">
        <Breadcrumbs items={[{ label: "Courses", path: "/courses" }]} />

        {/* Course Header Banner */}
        <section className="py-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400 text-slate-950">
                    {categoryName}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/20">
                    {levelLabel(course.level)}
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
                    <span>{rating || "\u2014"}</span>
                    <span className="text-slate-400 font-normal ml-1">
                      ({reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{durationLabel(course)}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>{bookingCount}+ Enrolled</span>
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
              {/* Tab Navigation Pill */}
              <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
                {[
                  { id: "overview", label: "Course Overview" },
                  { id: "syllabus", label: "Syllabus" },
                  { id: "requirements", label: "Entry Requirements" },
                  {
                    id: "schedule",
                    label: `Upcoming Batches (${schedules.length})`,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-8 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">
                      About This Qualification
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {course.description}
                    </p>
                  </div>

                  {/* Learning Outcomes */}
                  {whatYouLearn.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
                        What You Will Learn & Master
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {whatYouLearn.map((outcome, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What's Included */}
                  {includes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-4">
                        What's Included
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {includes.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center space-x-2.5"
                          >
                            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                            <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Syllabus */}
              {activeTab === "syllabus" && (
                <div className="space-y-4 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      Curriculum Syllabus & Units
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Comprehensive breakdown designed to meet official
                      regulated specifications.
                    </p>
                  </div>

                  {course.syllabus ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 p-5">
                      {course.syllabus}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Detailed syllabus will be shared upon enrolment. Contact
                      an advisor for more information.
                    </p>
                  )}
                </div>
              )}

              {/* Tab 3: Entry Requirements */}
              {activeTab === "requirements" && (
                <div className="space-y-6 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                      Eligibility & Entry Criteria
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Please ensure you meet the following baseline requirements
                      before enrolling.
                    </p>
                  </div>

                  {requirementLines.length > 0 ? (
                    <div className="space-y-3">
                      {requirementLines.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No specific entry requirements listed. Contact an advisor
                      for eligibility details.
                    </p>
                  )}
                </div>
              )}

              {/* Tab 4: Upcoming Batches */}
              {activeTab === "schedule" && (
                <div className="space-y-6 bg-white dark:bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                      Upcoming Class Dates & Intakes
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Select your preferred schedule to secure your seat.
                    </p>
                  </div>

                  {schedules.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      No upcoming dates are scheduled right now. Talk to an
                      advisor to be notified of the next intake.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {schedules.map((sched) => {
                        const seatsLeft = Math.max(
                          0,
                          (sched.maxStudents ?? 0) -
                            ((sched as any).currentStudents ?? 0),
                        );
                        const isSelected = selectedScheduleId === sched.id;
                        return (
                          <div
                            key={sched.id}
                            onClick={() => setSelectedScheduleId(sched.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 flex-wrap ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60"
                                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-indigo-300"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {formatDate(sched.startDate)}
                                  {"-"}
                                  {formatDate(sched.endDate)}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {sched.venue?.name}, {sched.venue?.city}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                seatsLeft > 0
                                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                                  : "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300"
                              }`}
                            >
                              {seatsLeft > 0
                                ? `${seatsLeft} Seats Available`
                                : "Full"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Reviews */}
              <CourseReviews courseId={course.id} courseTitle={course.title} />
            </div>

            {/* Right Sticky Booking Box */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-6">
                {/* Price Display */}
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">
                    Total Qualification Fee
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                      £{course.discountedPrice ?? course.price ?? 0}
                    </span>
                    {course.discountedPrice != null && (
                      <span className="text-sm text-slate-400 line-through font-medium">
                        £{course.price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Contact an advisor for instalment plan availability
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

                  {/* <button
                    onClick={() => openAdvisorModal(course.title)}
                    className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Talk to Course Advisor</span>
                  </button> */}

                  <button
                    onClick={() => openBrochureModal()}
                    className="w-full py-2 px-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Syllabus PDF</span>
                  </button>
                </div>

                {/* Key Course Inclusions (from includes[] if present, otherwise generic) */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {(includes.length > 0
                    ? includes.slice(0, 5)
                    : [
                        "Official Regulated Certificate",
                        "Free Practice Mock Exam Portal",
                        "Post-Course Job Assistance Clinic",
                      ]
                  ).map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Venue (from next schedule, if any) */}
                {schedules[0]?.venue && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Training Location:
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      {schedules[0].venue.name}, {schedules[0].venue.city}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

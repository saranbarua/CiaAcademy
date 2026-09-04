// src/components/home/FeaturedCoursesSlider.tsx
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  fetchPublicCourses,
  averageRating,
  durationLabel,
  nextScheduleVenue,
  ApiCourse,
} from "../../data/api/couAPi";

const FEATURED_COUNT = 6;

// NOTE: The API doesn't expose an explicit "featured" flag yet, so we rank
// published courses by review volume + rating as a stand-in. Swap this out
// for a real `isFeatured` field once/if the backend adds one.
function safeScore(course: ApiCourse): number {
  if (!course) return 0;
  const reviewCount = course._count?.reviews ?? 0;
  const bookingCount = course._count?.bookings ?? 0;
  const rating = averageRating(course);
  return rating * (reviewCount || 1) + bookingCount;
}

function pickFeatured(courses: ApiCourse[]): ApiCourse[] {
  return [...(courses || [])]
    .filter((c) => !!c && !!c.category && !!c.slug) // incomplete entries বাদ
    .sort((a, b) => safeScore(b) - safeScore(a))
    .slice(0, FEATURED_COUNT);
}

function CardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 animate-pulse">
      <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

export const FeaturedCoursesSlider: React.FC = () => {
  const [allCourses, setAllCourses] = useState<ApiCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchPublicCourses()
      .then(
        (data) => !cancelled && setAllCourses(Array.isArray(data) ? data : []),
      )
      .catch(
        (err) =>
          !cancelled &&
          setError(err.message || "Could not load featured courses."),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredCourses = pickFeatured(allCourses);
  const perPage = 3;
  const totalPages = Math.max(1, Math.ceil(featuredCourses.length / perPage));

  const handleNext = () => setPage((p) => (p + 1) % totalPages);
  const handlePrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));

  const visibleCourses = featuredCourses.slice(
    page * perPage,
    page * perPage + perPage,
  );

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60 inline-block mb-3 backdrop-blur-sm">
              Most Popular
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Featured UK Qualifications
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
              Our highest-rated career-starting and fast-track university
              progression programmes.
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all border border-white/80 dark:border-white/10 shadow-xs"
                aria-label="Previous Course"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all border border-white/80 dark:border-white/10 shadow-xs"
                aria-label="Next Course"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : featuredCourses.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 text-sm">
            No featured courses yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCourses.map((course, idx) => {
              const rating = averageRating(course);
              const venue = nextScheduleVenue(course);
              const reviewCount = course._count?.reviews ?? 0;
              const bookingCount = course._count?.bookings ?? 0;
              const categoryName = course.category?.name ?? "Course";
              const categorySlug = course.category?.slug ?? "all";

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-white/90 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-indigo-400/80 dark:hover:border-indigo-500/80 transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Image Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={course.thumbnailImage || "/placeholder-course.jpg"}
                      alt={course.title || "Course"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                    {venue && (
                      <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                        {venue}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
                          {categoryName}
                        </span>
                        <div className="flex items-center space-x-1 text-slate-400 font-medium">
                          <Users className="w-3.5 h-3.5" />
                          <span>{bookingCount}+ Enrolled</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        <Link to={`/courses/${categorySlug}/${course.slug}`}>
                          {course.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {course.shortDescription}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center text-amber-500 font-semibold">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span>{rating || "\u2014"}</span>
                          <span className="text-slate-400 font-normal ml-1">
                            ({reviewCount})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 font-semibold text-slate-700 dark:text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{durationLabel(course)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Price & Apply */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Tuition Fee
                        </span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                            \u00a3{course.discountedPrice ?? course.price ?? 0}
                          </span>
                          {course.discountedPrice != null && (
                            <span className="text-xs text-slate-400 line-through">
                              \u00a3{course.price}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/courses/${categorySlug}/${course.slug}`}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 transition-colors"
                        >
                          Syllabus
                        </Link>
                        <Link
                          to={`/apply?course=${encodeURIComponent(course.title || "")}`}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md shadow-indigo-600/25 flex items-center gap-1"
                        >
                          <span>Enroll</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

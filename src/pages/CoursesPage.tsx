// src/pages/CoursesPage.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Grid,
  List,
  Star,
  Clock,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  fetchPublicCategories,
  fetchPublicCourses,
  averageRating,
  levelLabel,
  durationLabel,
  ApiCategory,
  ApiCourse,
} from "../data/api/coursesApi";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function CardSkeleton({ list = false }: { list?: boolean }) {
  if (list) {
    return (
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 animate-pulse flex gap-5">
        <div className="w-40 aspect-[4/3] rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
        <div className="flex-1 space-y-2.5 py-1">
          <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 animate-pulse">
      <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-700" />
      <div className="p-5 space-y-2.5">
        <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
}

export const CoursesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Load categories once
  useEffect(() => {
    let cancelled = false;
    fetchPublicCategories()
      .then((data) => {
        if (!cancelled)
          setCategories(
            Array.isArray(data) ? data.filter((c) => !!c?.slug) : [],
          );
      })
      .catch(
        (err) =>
          !cancelled && setError(err.message || "Could not load categories."),
      )
      .finally(() => !cancelled && setCatLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // Load courses whenever the category filter changes (server-side filter by category)
  const loadCourses = useCallback((categorySlug: string) => {
    setCoursesLoading(true);
    setError(null);
    fetchPublicCourses(categorySlug === "all" ? undefined : categorySlug)
      .then((data) => {
        const safe = Array.isArray(data)
          ? data.filter((c) => !!c && !!c.slug)
          : [];
        setCourses(safe);
      })
      .catch((err) => setError(err.message || "Could not load courses."))
      .finally(() => setCoursesLoading(false));
  }, []);

  useEffect(() => {
    loadCourses(selectedCategory);
  }, [selectedCategory, loadCourses]);

  // Keep ?category= in the URL in sync
  useEffect(() => {
    if (selectedCategory === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", selectedCategory);
    }
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // Client-side search + level filter + sort (category already filtered server-side)
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = course.title?.toLowerCase().includes(q);
          const matchesDesc = course.shortDescription
            ?.toLowerCase()
            .includes(q);
          if (!matchesTitle && !matchesDesc) return false;
        }
        if (selectedLevel !== "all" && course.level !== selectedLevel)
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (
            (a.discountedPrice ?? a.price ?? 0) -
            (b.discountedPrice ?? b.price ?? 0)
          );
        }
        if (sortBy === "price-desc") {
          return (
            (b.discountedPrice ?? b.price ?? 0) -
            (a.discountedPrice ?? a.price ?? 0)
          );
        }
        if (sortBy === "rating") {
          return averageRating(b) - averageRating(a);
        }
        // featured: highest booking + review activity first
        const scoreA = (a._count?.bookings ?? 0) + (a._count?.reviews ?? 0);
        const scoreB = (b._count?.bookings ?? 0) + (b._count?.reviews ?? 0);
        return scoreB - scoreA;
      });
  }, [courses, searchQuery, selectedLevel, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" || selectedLevel !== "all" || !!searchQuery;

  const totalCourseCount = categories.reduce(
    (acc, c) => acc + (c._count?.courses ?? 0),
    0,
  );

  return (
    <>
      <SEOHead
        title="Accredited Courses & Qualifications Directory | Apex Academy"
        description="Browse all UK accredited qualifications in SIA Security, CITB Construction, Adult Care, Business Management, and University Top-Up Pathways."
        keywords="UK courses directory, SIA security courses London, CSCS card training, NVQ Health and Social Care, Ofqual diplomas"
        canonicalUrl="https://apexacademy.ac.uk/courses"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "Courses Directory" }]} />

        {/* Directory Header Banner */}
        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                UK Ofqual & SIA Accredited
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                Course Catalog & Qualifications
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                Discover professional certificates, vocational licencing, and
                higher education degree pathways with guaranteed exam support
                and job referrals.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Controls & Search Toolbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-4">
            {/* Top row: Search input + Views + Sort */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by course name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="md:col-span-4 flex items-center space-x-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="featured">Featured & Popular First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="md:col-span-2 flex items-center justify-end space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === "grid"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === "list"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom row: Filter Chips & Reset */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={catLoading}
                className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
              >
                <option value="all">All Categories ({totalCourseCount})</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat._count?.courses ?? 0})
                  </option>
                ))}
              </select>

              {/* Level selector */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Levels</option>
                <option value="ENTRY_LEVEL">Entry Level</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>

              {/* Reset button */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ml-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Results Summary Counter */}
          {!coursesLoading && !error && (
            <div className="flex items-center justify-between mt-6 mb-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <p>
                Showing{" "}
                <strong className="text-slate-900 dark:text-white font-bold">
                  {filteredCourses.length}
                </strong>{" "}
                qualification{filteredCourses.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Courses List / Grid */}
          {coursesLoading ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <CardSkeleton key={i} list />
                ))}
              </div>
            )
          ) : filteredCourses.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                No courses match your active filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or selecting "All Categories" to
                view our complete curriculum.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => {
                const rating = averageRating(course);
                const categorySlug = course.category?.slug ?? "all";
                const categoryName = course.category?.name ?? "Course";
                const outcomes = Array.isArray(course.whatYouLearn)
                  ? course.whatYouLearn.slice(0, 2)
                  : [];

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <img
                        src={course.thumbnailImage || "/placeholder-course.jpg"}
                        alt={course.title || "Course"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {course.discountedPrice != null && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-md">
                          Discount
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                        {levelLabel(course.level)}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-[11px]">
                            {categoryName}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{durationLabel(course)}</span>
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          <Link to={`/courses/${categorySlug}/${course.slug}`}>
                            {course.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                          {course.shortDescription}
                        </p>

                        <div className="flex items-center gap-1 mt-2 text-xs text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{rating || "\u2014"}</span>
                          <span className="text-slate-400 font-normal">
                            ({course._count?.reviews ?? 0})
                          </span>
                        </div>

                        {outcomes.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {outcomes.map((out, oIdx) => (
                              <div
                                key={oIdx}
                                className="flex items-center text-xs text-slate-500 dark:text-slate-400 truncate"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0" />
                                <span className="truncate">{out}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                            Course Fee
                          </span>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                              \u00a3
                              {course.discountedPrice ?? course.price ?? 0}
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
                            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          >
                            Details
                          </Link>
                          <Link
                            to={`/apply?course=${encodeURIComponent(course.title || "")}`}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-1"
                          >
                            <span>Apply</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredCourses.map((course, idx) => {
                const categorySlug = course.category?.slug ?? "all";
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6 group"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-5 w-full md:w-2/3">
                      <div className="w-full sm:w-40 aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={
                            course.thumbnailImage || "/placeholder-course.jpg"
                          }
                          alt={course.title || "Course"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold">
                            {levelLabel(course.level)}
                          </span>
                          <span className="text-slate-400">\u2022</span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {durationLabel(course)}
                          </span>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          <Link to={`/courses/${categorySlug}/${course.slug}`}>
                            {course.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {course.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
                      <div className="text-left sm:text-right mb-2">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                          Tuition Fee
                        </span>
                        <span className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                          \u00a3{course.discountedPrice ?? course.price ?? 0}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/courses/${categorySlug}/${course.slug}`}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/apply?course=${encodeURIComponent(course.title || "")}`}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

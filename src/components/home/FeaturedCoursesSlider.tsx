import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { coursesData } from '../../data/coursesData';

export const FeaturedCoursesSlider: React.FC = () => {
  const featuredCourses = coursesData.filter((c) => c.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine items per page based on viewport (we can handle standard responsive pagination index)
  const maxIndex = Math.max(0, featuredCourses.length - 1);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= featuredCourses.length - 3 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, featuredCourses.length - 3) : prev - 1));
  };

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
              Our highest-rated career-starting and fast-track university progression programmes.
            </p>
          </div>

          {/* Carousel Arrows */}
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
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, idx) => (
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
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {course.badge || 'Featured'}
                </span>
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                  {course.studyMode}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
                      {course.categoryName}
                    </span>
                    <div className="flex items-center space-x-1 text-slate-400 font-medium">
                      <Users className="w-3.5 h-3.5" />
                      <span>{course.enrolledCount}+ Enrolled</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    <Link to={`/courses/${course.category}/${course.slug}`}>
                      {course.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center text-amber-500 font-semibold">
                      <Star className="w-4 h-4 fill-current mr-1" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400 font-normal ml-1">({course.reviewsCount})</span>
                    </div>
                    <div className="flex items-center space-x-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Apply */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Tuition Fee</span>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
                        £{course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          £{course.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/courses/${course.category}/${course.slug}`}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 transition-colors"
                    >
                      Syllabus
                    </Link>
                    <Link
                      to={`/apply?course=${encodeURIComponent(course.title)}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md shadow-indigo-600/25 flex items-center gap-1"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

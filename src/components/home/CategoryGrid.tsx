import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  HardHat,
  Briefcase,
  HeartHandshake,
  Languages,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import { categoriesData } from '../../data/categoriesData';
import { coursesData } from '../../data/coursesData';
import { CourseCategory } from '../../types';

export const CategoryGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('security');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'HardHat': return <HardHat className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Languages': return <Languages className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  const selectedCategoryInfo = categoriesData.find((c) => c.id === activeCategory);
  const categoryCourses = coursesData.filter((c) => c.category === activeCategory);

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0E1322] relative overflow-hidden" id="courses-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 inline-block mb-3">
              Explore Our Courses
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Accredited UK Qualifications by Sector
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
              Select an industry discipline to view certified courses, upcoming training dates, and funding eligibility.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-cyan-400 hover:text-indigo-700 dark:hover:text-cyan-300 group"
          >
            <span>View Complete Course Directory (50+)</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs Pill Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categoriesData.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 backdrop-blur-md ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 scale-[1.02]'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-750 border border-white/80 dark:border-white/10 shadow-xs'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold'}`}>
                  {cat.courseCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Hero Banner */}
        {selectedCategoryInfo && (
          <motion.div
            key={selectedCategoryInfo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-violet-950/90 backdrop-blur-xl text-white border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {selectedCategoryInfo.name} Overview
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {selectedCategoryInfo.tagline}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedCategoryInfo.description}
              </p>
            </div>
            <Link
              to={`/courses/${selectedCategoryInfo.slug}`}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex-shrink-0"
            >
              Browse All {selectedCategoryInfo.name} →
            </Link>
          </motion.div>
        )}

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {categoryCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-3xl overflow-hidden border border-white/90 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-indigo-400/80 dark:hover:border-indigo-500/80 transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                {/* Course Card Image Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {course.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/90 backdrop-blur-md text-white shadow-md border border-white/20">
                      {course.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                    {course.level}
                  </span>
                </div>

                {/* Course Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Rating & Duration */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <div className="flex items-center text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal ml-1">({course.reviewsCount})</span>
                      </div>
                      <div className="flex items-center space-x-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      <Link to={`/courses/${course.category}/${course.slug}`}>
                        {course.title}
                      </Link>
                    </h4>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-3.5 space-y-1.5">
                      {course.learningOutcomes.slice(0, 2).map((outcome, oIdx) => (
                        <div key={oIdx} className="flex items-start text-xs text-slate-500 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA Buttons */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Course Fee</span>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
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
                        Details
                      </Link>
                      <Link
                        to={`/apply?course=${encodeURIComponent(course.title)}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/25 flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

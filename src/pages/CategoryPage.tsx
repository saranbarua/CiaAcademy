import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  HardHat,
  Briefcase,
  HeartHandshake,
  Languages,
  Award,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { categoriesData } from '../data/categoriesData';
import { coursesData } from '../data/coursesData';
import { useModal } from '../context/ModalContext';

export const CategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const { openAdvisorModal } = useModal();

  const category = categoriesData.find(
    (c) => c.slug === categorySlug || c.id === categorySlug
  );

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">Category Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The specified course category does not exist.</p>
        <Link to="/courses" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl">
          Browse All Courses
        </Link>
      </div>
    );
  }

  const categoryCourses = coursesData.filter((c) => c.category === category.id);

  return (
    <>
      <SEOHead
        title={`${category.name} Qualifications & Courses London | Apex Academy`}
        description={category.description}
        keywords={`${category.name} courses London, ${category.popularCert}, Ofqual accredited ${category.name}`}
        canonicalUrl={`https://apexacademy.ac.uk/courses/${category.slug}`}
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs
          items={[
            { label: 'Courses', path: '/courses' },
            { label: category.name }
          ]}
        />

        {/* Category Hero */}
        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                {category.courseCount} Regulated Qualifications
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                {category.name} Qualifications
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Courses Listing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {course.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-md">
                      {course.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                    {course.level}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <div className="flex items-center text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal ml-1">({course.reviewsCount})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      <Link to={`/courses/${course.category}/${course.slug}`}>
                        {course.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="mt-3.5 space-y-1.5">
                      {course.learningOutcomes.slice(0, 2).map((out, oIdx) => (
                        <div key={oIdx} className="flex items-start text-xs text-slate-500 dark:text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Course Fee</span>
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
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        to={`/apply?course=${encodeURIComponent(course.title)}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20 flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Help Footer */}
          <div className="mt-12 p-8 rounded-3xl bg-indigo-50/70 dark:bg-slate-850 border border-indigo-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Need corporate, group, or bespoke batch bookings for {category.name}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                We offer discounted enterprise packages with dedicated on-site trainers and tailored timetable slots.
              </p>
            </div>
            <button
              onClick={() => openAdvisorModal(`Corporate Booking - ${category.name}`)}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md flex-shrink-0"
            >
              Contact Corporate Desk
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

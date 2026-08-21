import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, BookOpen, FileText, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { coursesData } from '../../data/coursesData';
import { blogsData } from '../../data/blogsData';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearchModal } = useModal();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal via context if needed, or close if open
      }
      if (e.key === 'Escape') closeSearchModal();
    };
    if (isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchModalOpen, closeSearchModal]);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return coursesData.slice(0, 4);
    const q = query.toLowerCase();
    return coursesData.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.awardingBody.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredBlogs = useMemo(() => {
    if (!query.trim()) return blogsData.slice(0, 2);
    const q = query.toLowerCase();
    return blogsData.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSelect = (path: string) => {
    closeSearchModal();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearchModal}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search accredited courses, SIA licences, CSCS, Care diplomas, blogs..."
                autoFocus
                className="w-full bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base"
                id="search-modal-input"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeSearchModal}
                className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700"
              >
                ESC
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
              {/* Courses Results */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-2">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Courses & Qualifications ({filteredCourses.length})
                  </span>
                  <Link
                    to="/courses"
                    onClick={closeSearchModal}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline capitalize"
                  >
                    View All Directory
                  </Link>
                </div>

                {filteredCourses.length === 0 ? (
                  <div className="py-4 text-center text-sm text-slate-500">
                    No courses match "{query}". Try searching "SIA", "CSCS", "Care", "IELTS", or "Business".
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {filteredCourses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => handleSelect(`/courses/${course.category}/${course.slug}`)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-slate-800/80 transition-colors text-left group"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                              {course.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <span>{course.categoryName}</span>
                              <span>•</span>
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">£{course.price}</span>
                              <span>•</span>
                              <span>{course.duration}</span>
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Articles & Guides */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-2">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Articles & UK Guides
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filteredBlogs.map((blog) => (
                    <button
                      key={blog.id}
                      onClick={() => handleSelect(`/blog/${blog.slug}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-slate-800/80 transition-colors text-left group"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {blog.title}
                        </p>
                        <p className="text-xs text-slate-400">{blog.category} • {blog.readTime}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links Footer */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span>Popular:</span>
                <button onClick={() => setQuery('SIA')} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-100 hover:text-indigo-700">SIA</button>
                <button onClick={() => setQuery('CSCS')} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-100 hover:text-indigo-700">CSCS</button>
                <button onClick={() => setQuery('Care')} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-100 hover:text-indigo-700">Care</button>
                <button onClick={() => setQuery('IELTS')} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 hover:bg-indigo-100 hover:text-indigo-700">IELTS</button>
              </div>
              <span>Press ESC to exit</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { blogsData } from '../../data/blogsData';

export const NewsBlogSection: React.FC = () => {
  const recentBlogs = blogsData.slice(0, 3);

  return (
    <section className="py-20 bg-white dark:bg-[#0B0F19] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 inline-flex items-center gap-1.5 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
              Insights & Guides
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Latest UK Education & Visa News
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
              Stay ahead with expert guides on SIA renewals, CSCS card schemes, and UK university entry policies.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-cyan-400 hover:underline gap-1"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentBlogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60">
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-cyan-400 hover:underline gap-1"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

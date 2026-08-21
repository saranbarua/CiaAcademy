import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, BookOpen, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="404 Page Not Found | Apex Academy"
        description="The page you are looking for does not exist or has been relocated."
        canonicalUrl="https://apexacademy.ac.uk/404"
      />

      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] px-4 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto text-4xl font-extrabold font-display shadow-inner">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              The link you clicked may be broken, or the page may have been updated in our latest syllabus catalog.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link
              to="/courses"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

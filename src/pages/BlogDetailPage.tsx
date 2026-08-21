import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { blogsData } from '../data/blogsData';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">Article Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested guide could not be found.</p>
        <Link to="/blog" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl">
          Back to Blog
        </Link>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    image: [blog.image],
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apex Academy of Professional Education',
      logo: {
        '@type': 'ImageObject',
        url: 'https://apexacademy.ac.uk/logo.png'
      }
    },
    description: blog.excerpt
  };

  const relatedArticles = blogsData.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <>
      <SEOHead
        title={`${blog.title} | Apex Academy Blog`}
        description={blog.excerpt}
        keywords={blog.tags.join(', ')}
        canonicalUrl={`https://apexacademy.ac.uk/blog/${blog.slug}`}
        schemaJson={articleSchema}
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs
          items={[
            { label: 'Blog', path: '/blog' },
            { label: blog.title }
          ]}
        />

        {/* Main Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                {blog.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {blog.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
              {blog.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-slate-700 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 overflow-hidden">
                  <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{blog.author.name} <span className="font-normal text-xs text-slate-400">({blog.author.role})</span></p>
                  <p className="text-xs text-slate-500">
                    Published on {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl mb-10 aspect-[16/9] bg-slate-100 dark:bg-slate-900">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
              {blog.excerpt}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-4">
              <p>{blog.content}</p>
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center mr-2">
                <Tag className="w-3.5 h-3.5 mr-1" />
                Tags:
              </span>
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Back to Blog Button */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-cyan-400 hover:underline gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

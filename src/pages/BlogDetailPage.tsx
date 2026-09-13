import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, Tag, Eye } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  fetchBlogBySlug,
  fetchPublishedBlogs,
  formatBlogDate,
  estimateReadTime,
  initialsOf,
  gradientFor,
  ApiBlogDetail,
  ApiBlogListItem,
} from "../data/api/blogApi";

function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
      <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-6" />
      <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800 rounded-3xl mb-8" />
      <div className="space-y-3">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<ApiBlogDetail | null>(null);
  const [related, setRelated] = useState<ApiBlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchBlogBySlug(slug)
      .then((data) => !cancelled && setBlog(data))
      .catch(
        (err) =>
          !cancelled &&
          setError(err.message || "The requested guide could not be found."),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!blog) return;
    let cancelled = false;
    fetchPublishedBlogs()
      .then((data) => {
        if (cancelled) return;
        setRelated(data.filter((b) => b.id !== blog.id).slice(0, 2));
      })
      .catch(() => {
        // related articles are supplementary — fail silently
      });
    return () => {
      cancelled = true;
    };
  }, [blog]);

  if (loading) return <DetailSkeleton />;

  if (error || !blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">
          Article Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {error || "The requested guide could not be found."}
        </p>
        <Link
          to="/blog"
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    image: blog.featuredImage ? [blog.featuredImage] : undefined,
    datePublished: blog.publishedAt,
    dateModified: blog.publishedAt,
    author: {
      "@type": "Person",
      name: blog.author?.name || "Care International Academy",
    },
    publisher: {
      "@type": "Organization",
      name: "Care International Academy of Professional Education",
      logo: {
        "@type": "ImageObject",
        url: "https://careinternationalacademy.ac.uk/logo.png",
      },
    },
    description: blog.excerpt,
  };

  return (
    <>
      <SEOHead
        title={
          blog.metaTitle || `${blog.title} | Care International Academy Blog`
        }
        description={blog.metaDescription || blog.excerpt}
        keywords={(blog.tags || []).join(", ")}
        canonicalUrl={`https://careinternationalacademy.ac.uk/blog/${blog.slug}`}
        schemaJson={articleSchema}
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs
          items={[{ label: "Blog", path: "/blog" }, { label: blog.title }]}
        />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 flex-wrap gap-y-2">
              {blog.tags?.[0] && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                  {blog.tags[0]}
                </span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {estimateReadTime(blog.content)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                <Eye className="w-3.5 h-3.5 mr-1" />
                {blog.viewCount ?? 0} views
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
              {blog.title}
            </h1>

            {/* Author Info — API only gives id + name, so we render initials */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientFor(blog.author?.name || "?")} flex items-center justify-center font-bold text-white text-xs flex-shrink-0`}
                >
                  {initialsOf(blog.author?.name)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {blog.author?.name || "Care International Academy"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Published on {formatBlogDate(blog.publishedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="rounded-3xl overflow-hidden shadow-xl mb-10 aspect-[16/9] bg-slate-100 dark:bg-slate-900">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Content is stored as HTML on the backend (per the blog admin
                editor), so it's rendered rather than shown as plain text. */}
            <div
              className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-4 prose prose-sm sm:prose-base dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags?.length > 0 && (
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
            )}
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-4">
                More Guides
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors flex items-center gap-3"
                  >
                    <img
                      src={r.featuredImage || "/placeholder-blog.jpg"}
                      alt={r.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
                        {r.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {formatBlogDate(r.publishedAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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

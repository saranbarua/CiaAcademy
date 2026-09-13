import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search, ArrowRight } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import {
  fetchPublishedBlogs,
  formatBlogDate,
  ApiBlogListItem,
} from "../data/api/blogApi";

function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-md animate-pulse">
      <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-700" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
}

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<ApiBlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPublishedBlogs()
      .then((data) => !cancelled && setPosts(data))
      .catch(
        (err) =>
          !cancelled && setError(err.message || "Could not load blog posts."),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // The API doesn't expose a "category" field — tags are the closest
  // equivalent, so build the filter chips from whatever tags actually
  // appear across published posts.
  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [posts]);

  const filteredBlogs = useMemo(() => {
    return posts.filter((b) => {
      if (selectedTag !== "All" && !(b.tags || []).includes(selectedTag))
        return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          b.title?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <>
      <SEOHead
        title="Care International Academy Blog | UK Education Guides, Licencing News & Visa Insights"
        description="Read the latest articles on SIA licences, CSCS card requirements, UK university degree top-up pathways, and student visa updates."
        keywords="Care International Academy blog, SIA licence guide 2026, CSCS card steps, UK student visa news, healthcare NVQ salary UK"
        canonicalUrl="https://careinternationalacademy.ac.uk/blog"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "Blog & UK Education Guides" }]} />

        {/* Hero */}
        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                Industry Knowledge Base
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                UK Education, Career & Visa Guides
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                Authoritative insights written by our accredited faculty and UK
                immigration consultants.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-slate-800/90 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles & guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {tags.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto no-scrollbar">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedTag === tag
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Blog Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                No articles match your search
              </h3>
              <p className="text-xs text-slate-500 mt-2">
                Try a different keyword or tag.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={blog.featuredImage || "/placeholder-blog.jpg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {blog.tags?.[0] && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {formatBlogDate(blog.publishedAt)}
                        </span>
                        <span>{blog.viewCount ?? 0} views</span>
                      </div>

                      <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
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
                        <span>Read Full Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

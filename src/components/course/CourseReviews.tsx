// src/components/course/CourseReviews.tsx
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, MessageSquareQuote } from "lucide-react";
import {
  fetchCourseReviews,
  averageOf,
  ratingBreakdown,
  initialsOf,
  gradientFor,
  formatReviewDate,
  ApiReview,
} from "../../data/api/reviewsApi";

interface CourseReviewsProps {
  courseId: number;
  courseTitle?: string;
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          width={size}
          height={size}
          className={
            n <= Math.round(rating)
              ? "text-amber-500 fill-current"
              : "text-slate-300 dark:text-slate-700"
          }
        />
      ))}
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-1.5">
              <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-2.5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded mb-1.5" />
          <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  );
}

export const CourseReviews: React.FC<CourseReviewsProps> = ({
  courseId,
  courseTitle,
}) => {
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCourseReviews(courseId)
      .then(
        (data) =>
          !cancelled &&
          setReviews(Array.isArray(data) ? data.filter((r) => !!r) : []),
      )
      .catch(
        (err) =>
          !cancelled && setError(err.message || "Could not load reviews."),
      )
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  const average = averageOf(reviews);
  const breakdown = ratingBreakdown(reviews);
  const total = reviews.length;

  return (
    <section className="py-16" id="reviews">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-8">
          <MessageSquareQuote className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Student Reviews{courseTitle ? ` \u2014 ${courseTitle}` : ""}
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <ReviewsSkeleton />
        ) : total === 0 ? (
          <div className="text-center py-14 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm">
            No reviews yet for this course. Be the first to share your
            experience once you've completed it.
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="text-center flex-shrink-0">
                <p className="text-5xl font-extrabold font-display text-slate-900 dark:text-white leading-none">
                  {average || "\u2014"}
                </p>
                <div className="mt-2 flex justify-center">
                  <StarRow rating={average} size={16} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Based on {total} review{total !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex-1 w-full space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = breakdown[star] || 0;
                  const pct = total ? (count / total) * 100 : 0;
                  return (
                    <div
                      key={star}
                      className="flex items-center gap-2.5 text-xs"
                    >
                      <span className="w-8 text-slate-500 dark:text-slate-400 flex-shrink-0">
                        {star} star
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-slate-500 dark:text-slate-400 flex-shrink-0">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review list */}
            <div className="space-y-4">
              {reviews.map((review, idx) => {
                const traineeName = review.trainee?.name || "Anonymous";
                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradientFor(traineeName)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                        >
                          {initialsOf(traineeName)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {traineeName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatReviewDate(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      <StarRow rating={review.rating} />
                    </div>

                    {review.title && (
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">
                        {review.title}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {review.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// src/pages/ApplyPage.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { fetchPublicCourses, ApiCourse } from "../data/api/couAPi";
import {
  fetchSchedulesForCourse,
  ApiScheduleForCourse,
} from "../data/api/schedulesApi";
import { createBooking } from "../data/api/bookingsApi";
import { useTraineeAuth } from "../context/TraineeAuthContext";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function gbp(n?: number | null) {
  if (n === null || n === undefined) return "\u2014";
  return `${Number(n).toFixed(2)}`;
}

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCourseTitle = searchParams.get("course") || "";
  const navigate = useNavigate();
  const { trainee } = useTraineeAuth();

  const [step, setStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const [schedules, setSchedules] = useState<ApiScheduleForCourse[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  const [notes, setNotes] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all published courses once
  useEffect(() => {
    let cancelled = false;
    fetchPublicCourses()
      .then((data) => {
        if (cancelled) return;
        const safe = Array.isArray(data)
          ? data.filter((c) => !!c && !!c.id)
          : [];
        setCourses(safe);
        if (preselectedCourseTitle) {
          const match = safe.find((c) => c.title === preselectedCourseTitle);
          if (match) setSelectedCourseId(match.id);
        } else if (safe.length > 0) {
          setSelectedCourseId(safe[0].id);
        }
      })
      .catch(
        (err) =>
          !cancelled && setError(err.message || "Could not load courses."),
      )
      .finally(() => !cancelled && setCoursesLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load schedules whenever the selected course changes
  useEffect(() => {
    if (!selectedCourseId) return;
    setSchedulesLoading(true);
    setSelectedScheduleId(null);
    setError(null);
    fetchSchedulesForCourse(selectedCourseId)
      .then((data) =>
        setSchedules(Array.isArray(data) ? data.filter((s) => !!s) : []),
      )
      .catch((err) =>
        setError(err.message || "Could not load schedules for this course."),
      )
      .finally(() => setSchedulesLoading(false));
  }, [selectedCourseId]);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const selectedSchedule =
    schedules.find((s) => s.id === selectedScheduleId) || null;

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1 && !selectedCourseId) {
      setError("Please select a course to continue.");
      return;
    }
    if (step === 2 && !selectedScheduleId) {
      setError("Please select an available batch to continue.");
      return;
    }

    if (step < 3) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }

    // Final submit
    if (!termsAccepted) {
      setError("Please accept the terms of enrolment to continue.");
      return;
    }
    if (!selectedCourseId || !selectedScheduleId) return;

    setSubmitting(true);
    try {
      const result = await createBooking({
        courseId: selectedCourseId,
        scheduleId: selectedScheduleId,
        notes: notes || undefined,
        specialRequirements: specialRequirements || undefined,
      });
      setBookingRef(result.bookingRef);
      setIsCompleted(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      window.scrollTo({ top: 100, behavior: "smooth" });
    } catch (err: any) {
      setError(
        err.message || "Could not submit your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <SEOHead
        title="Apply Online | Student Admission & Enrolment | Care International  Academy"
        description="Submit your online course application for accredited UK qualifications."
        canonicalUrl="https://Care International academy.ac.uk/apply"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "Online Application" }]} />

        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                Official Enrolment Portal
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                Care International Academy Application Form
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                Select your course and batch, then confirm your booking in 3
                quick steps.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {!isCompleted && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[
                  { num: 1, label: "Choose Course" },
                  { num: 2, label: "Choose Batch" },
                  { num: 3, label: "Confirm & Submit" },
                ].map((s) => (
                  <div key={s.num} className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        step >= s.num
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {step > s.num ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        s.num
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden sm:inline ${step >= s.num ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
            {isCompleted ? (
              <div className="text-center space-y-6 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Application Submitted Successfully
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                    Welcome to Care International Academy,{" "}
                    {trainee?.name?.split(" ")[0]}!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    We've received your booking for{" "}
                    <strong>{selectedCourse?.title}</strong>. Your enrolment is
                    now pending confirmation from our admissions team.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-400 uppercase">
                      Booking Ref:
                    </span>
                    <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                      {bookingRef}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Batch:</span>
                    <strong className="text-slate-900 dark:text-white">
                      {selectedSchedule &&
                        `${formatDate(selectedSchedule.startDate)} \u2013 ${formatDate(selectedSchedule.endDate)}`}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Venue:</span>
                    <strong className="text-slate-900 dark:text-white">
                      {selectedSchedule?.venue?.name},{" "}
                      {selectedSchedule?.venue?.city}
                    </strong>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/my-account"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    View My Bookings
                  </Link>
                  <Link
                    to="/"
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNext} className="space-y-6">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* STEP 1: Course Selection */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                      Step 1: Select Your Qualification
                    </h3>

                    {coursesLoading ? (
                      <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
                    ) : (
                      <select
                        value={selectedCourseId ?? ""}
                        onChange={(e) =>
                          setSelectedCourseId(Number(e.target.value))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title} ({gbp(c.discountedPrice ?? c.price)})
                          </option>
                        ))}
                      </select>
                    )}

                    {selectedCourse && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                        {selectedCourse.shortDescription}
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: Schedule Selection */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                      Step 2: Select Your Batch
                    </h3>

                    {schedulesLoading ? (
                      <div className="space-y-2">
                        {[0, 1].map((i) => (
                          <div
                            key={i}
                            className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse"
                          />
                        ))}
                      </div>
                    ) : schedules.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        No upcoming batches are scheduled for this course right
                        now. Please choose a different course or check back
                        soon.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {schedules.map((sched) => {
                          const seatsLeft = Math.max(
                            0,
                            (sched.maxStudents ?? 0) -
                              (sched.currentStudents ?? 0),
                          );
                          const isFull = seatsLeft <= 0;
                          const isSelected = selectedScheduleId === sched.id;
                          return (
                            <label
                              key={sched.id}
                              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 flex-wrap transition-all ${
                                isFull
                                  ? "opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                                  : isSelected
                                    ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 cursor-pointer"
                                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-indigo-300 cursor-pointer"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="schedule"
                                  disabled={isFull}
                                  checked={isSelected}
                                  onChange={() =>
                                    setSelectedScheduleId(sched.id)
                                  }
                                  className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                                  <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                    {formatDate(sched.startDate)} -{" "}
                                    {formatDate(sched.endDate)}
                                  </h4>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {sched.venue?.name}, {sched.venue?.city}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  isFull
                                    ? "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300"
                                    : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                                }`}
                              >
                                {isFull
                                  ? "Full"
                                  : `${seatsLeft} Seats Available`}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Confirmation */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700">
                      Step 3: Review & Confirm
                    </h3>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex justify-between">
                        <span>Course:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {selectedCourse?.title}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Batch:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {selectedSchedule &&
                            `${formatDate(selectedSchedule.startDate)} \u2013 ${formatDate(selectedSchedule.endDate)}`}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Venue:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {selectedSchedule?.venue?.name},{" "}
                          {selectedSchedule?.venue?.city}
                        </strong>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>Total Fee:</span>
                        <strong className="text-indigo-600 dark:text-indigo-400">
                          {gbp(
                            selectedCourse?.discountedPrice ??
                              selectedCourse?.price,
                          )}
                        </strong>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Special Requirements (optional)
                      </label>
                      <textarea
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                        rows={2}
                        placeholder="e.g. Wheelchair access needed"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Additional Notes (optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={2}
                        placeholder="Anything else we should know?"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300 pt-2">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>
                        I agree to Care International Academy's Terms of
                        Enrolment and Privacy Policy, and confirm all submitted
                        information is accurate.
                      </span>
                    </label>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={submitting || coursesLoading}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-60"
                  >
                    <span>
                      {submitting
                        ? "Submitting\u2026"
                        : step === 3
                          ? "Confirm & Submit Booking"
                          : "Continue to Next Step"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// src/pages/MyAccountPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  Save,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useTraineeAuth } from "../context/TraineeAuthContext";
import { updateMyProfile } from "../data/api/traineeApi";
import {
  fetchMyBookings,
  bookingStatusMeta,
  ApiBooking,
} from "../data/api/bookingsApi";

function formatDate(iso?: string) {
  if (!iso) return "\u2014";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function gbp(n?: number) {
  if (n === null || n === undefined) return "\u2014";
  return `\u00a3${Number(n).toFixed(2)}`;
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
    </div>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
const labelClass =
  "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

export const MyAccountPage: React.FC = () => {
  const {
    profile,
    loading: profileLoading,
    refreshProfile,
    logout,
  } = useTraineeAuth();

  const [tab, setTab] = useState<"profile" | "bookings">("profile");

  // Profile edit state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    city: "",
    postcode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    employerName: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Bookings state
  const [bookings, setBookings] = useState<ApiBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        addressLine1: profile.addressLine1 || "",
        city: profile.city || "",
        postcode: profile.postcode || "",
        emergencyContactName: profile.emergencyContactName || "",
        emergencyContactPhone: profile.emergencyContactPhone || "",
        employerName: (profile as any).employerName || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    let cancelled = false;
    fetchMyBookings()
      .then(
        (data) =>
          !cancelled &&
          setBookings(Array.isArray(data) ? data.filter((b) => !!b) : []),
      )
      .catch(
        (err) =>
          !cancelled &&
          setBookingsError(err.message || "Could not load your bookings."),
      )
      .finally(() => !cancelled && setBookingsLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(false);
    setSaving(true);
    try {
      await updateMyProfile(form);
      await refreshProfile();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Could not update your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEOHead
        title="My Account | Apex Academy"
        description="Manage your Apex Academy profile, view your bookings, and track your course progress."
        canonicalUrl="https://apexacademy.ac.uk/my-account"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "My Account" }]} />

        <section className="py-10 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight">
                  {profile?.name || "My Account"}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {profile?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: "profile", label: "Profile Details" },
              { id: "bookings", label: `My Bookings (${bookings.length})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  tab === t.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {tab === "profile" && (
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              {profileLoading && !profile ? (
                <ProfileSkeleton />
              ) : (
                <form onSubmit={handleSave} className="space-y-4">
                  {saveError && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{saveError}</span>
                    </div>
                  )}
                  {saveSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-sm text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Profile updated successfully.</span>
                    </div>
                  )}

                  {/* Read-only email */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={profile?.email || ""}
                        disabled
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Email cannot be changed here. Contact support if needed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Address Line 1</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={form.addressLine1}
                          onChange={(e) => set("addressLine1", e.target.value)}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => set("city", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Postcode</label>
                      <input
                        type="text"
                        value={form.postcode}
                        onChange={(e) => set("postcode", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Employer Name</label>
                      <input
                        type="text"
                        value={form.employerName}
                        onChange={(e) => set("employerName", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-2 pb-1 border-b border-slate-100 dark:border-slate-700">
                    Emergency Contact
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Contact Name</label>
                      <input
                        type="text"
                        value={form.emergencyContactName}
                        onChange={(e) =>
                          set("emergencyContactName", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Contact Phone</label>
                      <input
                        type="tel"
                        value={form.emergencyContactPhone}
                        onChange={(e) =>
                          set("emergencyContactPhone", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-60"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? "Saving\u2026" : "Save Changes"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {tab === "bookings" && (
            <div className="space-y-4">
              {bookingsError ? (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300">
                  {bookingsError}
                </div>
              ) : bookingsLoading ? (
                <div className="space-y-3 animate-pulse">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-28 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80"
                    />
                  ))}
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-16 px-6 bg-white dark:bg-slate-800/90 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                  <BookOpen className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    No bookings yet
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Browse our course catalog and apply for your first
                    qualification.
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    <span>Browse Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                bookings.map((booking) => {
                  const meta = bookingStatusMeta(booking.status);
                  return (
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div>
                          <p className="text-[11px] font-mono text-slate-400">
                            {booking.bookingRef}
                          </p>
                          <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mt-0.5">
                            <Link
                              to={`/courses/all/${booking.course?.slug}`}
                              className="hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              {booking.course?.title}
                            </Link>
                          </h3>
                        </div>
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold flex-shrink-0"
                          style={{ color: meta.color, background: meta.bg }}
                        >
                          {meta.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {formatDate(booking.schedule?.startDate)} \u2013{" "}
                            {formatDate(booking.schedule?.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>
                            {booking.schedule?.venue?.name},{" "}
                            {booking.schedule?.venue?.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {booking.schedule?.startTime} \u2013{" "}
                            {booking.schedule?.endTime}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                        <div>
                          <p className="text-slate-400">Total</p>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {gbp(booking.totalAmount)}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">Deposit</p>
                          <p
                            className={`font-bold ${booking.depositPaid ? "text-emerald-600" : "text-amber-600"}`}
                          >
                            {gbp(booking.depositAmount)}{" "}
                            {booking.depositPaid ? "\u2713" : ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">Balance</p>
                          <p
                            className={`font-bold ${booking.balancePaid ? "text-emerald-600" : "text-slate-700 dark:text-slate-300"}`}
                          >
                            {gbp(booking.balanceAmount)}{" "}
                            {booking.balancePaid ? "\u2713" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

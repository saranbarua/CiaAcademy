// src/pages/TraineeRegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ArrowRight, AlertCircle } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useTraineeAuth } from "../context/TraineeAuthContext";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
const labelClass =
  "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5";

export const TraineeRegisterPage: React.FC = () => {
  const { register } = useTraineeAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    addressLine1: "",
    city: "",
    postcode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    marketingOptIn: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: string, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        dateOfBirth: form.dateOfBirth
          ? new Date(form.dateOfBirth).toISOString()
          : undefined,
        addressLine1: form.addressLine1 || undefined,
        city: form.city || undefined,
        postcode: form.postcode || undefined,
        emergencyContactName: form.emergencyContactName || undefined,
        emergencyContactPhone: form.emergencyContactPhone || undefined,
        howDidYouHear: "Website",
        marketingOptIn: form.marketingOptIn,
      });
      navigate("/my-account", { replace: true });
    } catch (err: any) {
      setError(
        err.message || "Could not create your account. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Create Student Account | Care International  Academy"
        description="Register a free student account to book courses, track certificates, and manage your enrolments."
        canonicalUrl="https://Care International academy.ac.uk/register"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
        <Breadcrumbs items={[{ label: "Create Account" }]} />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/25">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Create Your Student Account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Register once to book courses, track your progress, and download
              certificates.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-700">
                Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. John Doe"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="07700 900000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Password *</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    placeholder="At least 8 characters"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Confirm Password *</label>
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    placeholder="Re-enter password"
                    className={inputClass}
                  />
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-2 pb-1 border-b border-slate-100 dark:border-slate-700">
                Additional Details{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => set("dateOfBirth", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="e.g. London"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Address Line 1</label>
                  <input
                    type="text"
                    value={form.addressLine1}
                    onChange={(e) => set("addressLine1", e.target.value)}
                    placeholder="123 Main Street"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Postcode</label>
                  <input
                    type="text"
                    value={form.postcode}
                    onChange={(e) => set("postcode", e.target.value)}
                    placeholder="E1 7RA"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Emergency Contact Name</label>
                  <input
                    type="text"
                    value={form.emergencyContactName}
                    onChange={(e) =>
                      set("emergencyContactName", e.target.value)
                    }
                    placeholder="e.g. Jane Doe"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Emergency Contact Phone</label>
                  <input
                    type="tel"
                    value={form.emergencyContactPhone}
                    onChange={(e) =>
                      set("emergencyContactPhone", e.target.value)
                    }
                    placeholder="07700 900001"
                    className={inputClass}
                  />
                </div>
              </div>

              <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300 pt-2">
                <input
                  type="checkbox"
                  checked={form.marketingOptIn}
                  onChange={(e) => set("marketingOptIn", e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>
                  I'd like to receive course updates and promotional offers by
                  email.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>
                  {submitting
                    ? "Creating your account\u2026"
                    : "Create Account"}
                </span>
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

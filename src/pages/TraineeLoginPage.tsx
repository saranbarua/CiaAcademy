import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useTraineeAuth } from "../context/TraineeAuthContext";

export const TraineeLoginPage: React.FC = () => {
  const { login } = useTraineeAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/my-account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err.message || "Could not log you in. Please check your details.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Student Login | Apex Academy"
        description="Log in to your Apex Academy student account to manage bookings, view certificates, and update your profile."
        canonicalUrl="https://apexacademy.ac.uk/login"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
        <Breadcrumbs items={[{ label: "Student Login" }]} />

        <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/25">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Log in to manage your bookings and course progress.
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
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="text-right mt-1.5">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <span>{submitting ? "Logging in\u2026" : "Log In"}</span>
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

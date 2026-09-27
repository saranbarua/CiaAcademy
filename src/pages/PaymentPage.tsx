// src/pages/PaymentPage.tsx
//
// Route: /payment/:bookingId
// Expects location.state (set by ApplyPage / MyAccountPage) with:
//   { type: "deposit" | "balance", courseTitle?, bookingRef?, amount? }
// `amount` is only used for display — the actual charge is decided by the
// backend from the booking, per POST /payments/my/intent.

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AlertCircle, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { createMyPaymentIntent, PaymentType } from "../data/api/paymentsApi";
import { fetchMyBookings } from "../data/api/bookingsApi";
import { useBookingPaymentPolling } from "../data/api/useBookingPaymentPolling";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function gbp(n?: number | string | null) {
  if (n === null || n === undefined || n === "") return "\u2014";
  return `\u00a3${Number(n).toFixed(2)}`;
}

interface LocationState {
  type?: PaymentType;
  courseTitle?: string;
  bookingRef?: string;
  amount?: number | string;
}

function ConfirmingScreen() {
  return (
    <div className="text-center py-10 space-y-3">
      <Loader2 className="w-8 h-8 text-indigo-600 mx-auto animate-spin" />
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Confirming your payment\u2026
      </p>
      <p className="text-xs text-slate-400">
        This can take a few seconds while we hear back from Stripe.
      </p>
    </div>
  );
}

function ConfirmedScreen({ bookingRef }: { bookingRef?: string }) {
  return (
    <div className="text-center space-y-4 py-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
        <ShieldCheck className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
        Payment Confirmed
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {bookingRef ? (
          <>
            Your payment for booking <strong>{bookingRef}</strong> has been
            received.
          </>
        ) : (
          "Your payment has been received."
        )}
      </p>
      <Link
        to="/my-account"
        className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
      >
        View My Bookings
      </Link>
    </div>
  );
}

function TimeoutScreen({ traineeEmail }: { traineeEmail?: string }) {
  return (
    <div className="text-center space-y-4 py-6">
      <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Still confirming\u2026
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
        Your payment is taking a little longer to confirm than usual.
        {traineeEmail
          ? ` We'll email a receipt to ${traineeEmail} as soon as it's done.`
          : " You'll get an email receipt as soon as it's done."}
      </p>
      <Link
        to="/my-account"
        className="inline-block px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
      >
        Check My Bookings
      </Link>
    </div>
  );
}

const CheckoutForm: React.FC<{
  bookingId: number;
  type: PaymentType;
  amountLabel: string;
  courseTitle?: string;
  bookingRef?: string;
}> = ({ bookingId, type, amountLabel, courseTitle, bookingRef }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Once true, we hand off entirely to polling (Signal 3) — the client-side
  // confirmPayment result is only ever a hint, never the final word.
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const { state } = useBookingPaymentPolling(bookingId, {
    skip: !awaitingConfirmation,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/${bookingId}/result?type=${type}`,
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(
        stripeError.message ||
          "Your card was declined. Please try a different card.",
      );
      setSubmitting(false);
      return;
    }

    // No redirect happened (no 3DS needed) — paymentIntent.status is a hint
    // only. Either way, start polling; that's the only authoritative signal.
    if (
      paymentIntent?.status === "succeeded" ||
      paymentIntent?.status === "processing"
    ) {
      setAwaitingConfirmation(true);
    } else {
      setError("Payment could not be completed. Please try again.");
    }
    setSubmitting(false);
  };

  if (awaitingConfirmation) {
    if (state === "confirmed")
      return <ConfirmedScreen bookingRef={bookingRef} />;
    if (state === "timeout") return <TimeoutScreen />;
    return <ConfirmingScreen />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-sm text-red-600 dark:text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
        {courseTitle && (
          <div className="flex justify-between">
            <span>Course:</span>
            <strong className="text-slate-900 dark:text-white">
              {courseTitle}
            </strong>
          </div>
        )}
        {bookingRef && (
          <div className="flex justify-between">
            <span>Booking Ref:</span>
            <strong className="text-slate-900 dark:text-white font-mono">
              {bookingRef}
            </strong>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <span className="capitalize">{type} due now:</span>
          <strong className="text-indigo-600 dark:text-indigo-400 text-sm">
            {amountLabel}
          </strong>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Payment details
        </label>
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={submitting || !stripe}
        className="w-full px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Lock className="w-4 h-4" />
        <span>{submitting ? "Processing\u2026" : `Pay ${amountLabel}`}</span>
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5" />
        Payments are securely processed by Stripe. Card details never touch our
        servers.
      </p>
    </form>
  );
};

export const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const numericBookingId = useMemo(
    () => (bookingId ? Number(bookingId) : null),
    [bookingId],
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [type, setType] = useState<PaymentType | null>(state.type ?? null);
  const [amount, setAmount] = useState<number | string | null>(
    state.amount ?? null,
  );
  const [courseTitle, setCourseTitle] = useState<string | undefined>(
    state.courseTitle,
  );
  const [bookingRef, setBookingRef] = useState<string | undefined>(
    state.bookingRef,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!numericBookingId) {
      setError("Missing booking reference.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function resolveDetailsAndIntent() {
      try {
        let resolvedType = state.type;

        // If we weren't handed the type/course/ref (e.g. direct link, page
        // refresh mid-flow), figure out what's still owed from the booking.
        if (!resolvedType || !state.courseTitle) {
          const bookings = await fetchMyBookings();
          const match = (bookings || []).find(
            (b: any) => b.id === numericBookingId,
          );
          if (!match) {
            throw new Error("We couldn't find that booking on your account.");
          }
          if (cancelled) return;

          setCourseTitle(match.course?.title);
          setBookingRef(match.bookingRef);

          if (!resolvedType) {
            if (!match.depositPaid) {
              resolvedType = "deposit";
              setAmount(match.depositAmount);
            } else if (!match.balancePaid) {
              resolvedType = "balance";
              setAmount(match.balanceAmount);
            } else {
              throw new Error("This booking is already fully paid.");
            }
          } else {
            setAmount(
              resolvedType === "deposit"
                ? match.depositAmount
                : match.balanceAmount,
            );
          }
          setType(resolvedType);
        }

        const intent = await createMyPaymentIntent({
          bookingId: numericBookingId,
          type: resolvedType as PaymentType,
        });
        if (!cancelled) setClientSecret(intent.clientSecret);
      } catch (err: any) {
        if (!cancelled)
          setError(err.message || "Could not start this payment.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    resolveDetailsAndIntent();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericBookingId]);

  const amountLabel = gbp(amount);

  return (
    <>
      <SEOHead
        title="Secure Payment | Care International Academy"
        description="Complete your secure course payment."
        canonicalUrl="https://careinternationalacademy.ac.uk/payment"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <section className="py-10 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
              Secure Checkout
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Complete Your Payment
            </h1>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-xl">
            {loading ? (
              <div className="h-48 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
            ) : error || !clientSecret || !numericBookingId || !type ? (
              <div className="text-center space-y-4 py-6">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {error || "We couldn't find a payment to process."}
                </p>
                <Link
                  to="/my-account"
                  className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Go to My Bookings
                </Link>
              </div>
            ) : (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  bookingId={numericBookingId}
                  type={type}
                  amountLabel={amountLabel}
                  courseTitle={courseTitle}
                  bookingRef={bookingRef}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

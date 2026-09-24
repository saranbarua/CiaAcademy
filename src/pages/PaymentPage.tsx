// src/pages/PaymentPage.tsx
//
// Usage:
//   Route: <Route path="/payment/:bookingId" element={<PaymentPage />} />
//
//   Navigate to it after a booking is created, passing what you already have
//   so we don't need an extra fetch:
//     navigate(`/payment/${completedBooking.id}`, {
//       state: {
//         amount: completedBooking.depositAmount,
//         type: "deposit",
//         courseTitle: completedBooking.course?.title,
//         bookingRef: completedBooking.bookingRef,
//       },
//     });
//
//   If the page is opened directly (e.g. from an email link / "Pay Now" in
//   My Account) with no location.state, it falls back to fetching the
//   trainee's bookings and reading the amount from there.

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircle2, AlertCircle, ShieldCheck, Lock } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { createPaymentIntent, PaymentType } from "../data/api/paymentsApi";
import { useTraineeAuth } from "../context/TraineeAuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function gbp(n?: number | null) {
  if (n === null || n === undefined) return "\u2014";
  return `\u00a3${Number(n).toFixed(2)}`;
}

interface LocationState {
  amount?: number;
  type?: PaymentType;
  courseTitle?: string;
  bookingRef?: string;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#0f172a",
      fontFamily: "inherit",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#e11d48" },
  },
};

const CheckoutForm: React.FC<{
  bookingId: number;
  amount: number;
  type: PaymentType;
  courseTitle?: string;
  bookingRef?: string;
}> = ({ bookingId, amount, type, courseTitle, bookingRef }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { trainee } = useTraineeAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setSubmitting(true);
    try {
      const { clientSecret } = await createPaymentIntent({
        bookingId,
        amount,
        type,
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: trainee?.name || undefined,
            email: trainee?.email || undefined,
          },
        },
      });

      if (result.error) {
        setError(
          result.error.message ||
            "Your card was declined. Please try a different card.",
        );
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        setSucceeded(true);
        // Final booking status (CONFIRMED / balancePaid) is set server-side
        // by the Stripe webhook, not by this client call. It should already
        // have landed by the time this resolves, but treat it as
        // "processing" rather than instant if you show live booking status
        // elsewhere.
      } else {
        // e.g. requires_action already handled by confirmCardPayment, but
        // cover any other non-succeeded terminal state defensively.
        setError(
          "Payment could not be completed. Please try again or use a different card.",
        );
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <div className="text-center space-y-5 py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
            Payment Successful
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
            We've received your {type} payment of <strong>{gbp(amount)}</strong>
            {bookingRef && (
              <>
                {" "}
                for booking <strong>{bookingRef}</strong>
              </>
            )}
            . Your booking will update to reflect this shortly.
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/my-account"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    );
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
            {gbp(amount)}
          </strong>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          Card details
        </label>
        <div className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus-within:border-indigo-500">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || !stripe}
        className="w-full px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Lock className="w-4 h-4" />
        <span>{submitting ? "Processing\u2026" : `Pay ${gbp(amount)}`}</span>
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

  const [amount, setAmount] = useState<number | null>(state.amount ?? null);
  const [type, setType] = useState<PaymentType | null>(state.type ?? null);
  const [courseTitle, setCourseTitle] = useState<string | undefined>(
    state.courseTitle,
  );
  const [bookingRef, setBookingRef] = useState<string | undefined>(
    state.bookingRef,
  );
  const [loading, setLoading] = useState(!state.amount);
  const [loadError, setLoadError] = useState<string | null>(null);

  const numericBookingId = useMemo(
    () => (bookingId ? Number(bookingId) : null),
    [bookingId],
  );

  // Fallback: if the page was opened without location.state (direct link,
  // refresh, "Pay Now" from My Account), look the booking up instead.
  useEffect(() => {
    if (state.amount || !numericBookingId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    import("../data/api/bookingsApi")
      .then(({ fetchMyBookings }) => fetchMyBookings())
      .then((bookings: any[]) => {
        if (cancelled) return;
        const booking = bookings.find((b) => b.id === numericBookingId);
        if (!booking) {
          setLoadError("We couldn't find that booking on your account.");
          return;
        }
        setCourseTitle(booking.course?.title);
        setBookingRef(booking.bookingRef);
        if (!booking.depositPaid) {
          setAmount(booking.depositAmount);
          setType("deposit");
        } else if (!booking.balancePaid) {
          setAmount(booking.balanceAmount);
          setType("balance");
        } else {
          setLoadError("This booking is already fully paid.");
        }
      })
      .catch(
        (err) =>
          !cancelled &&
          setLoadError(err.message || "Could not load booking details."),
      )
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [numericBookingId, state.amount]);

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
              <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
            ) : loadError || !numericBookingId || !amount || !type ? (
              <div className="text-center space-y-4 py-6">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {loadError || "We couldn't find a payment to process."}
                </p>
                <Link
                  to="/my-account"
                  className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Go to My Bookings
                </Link>
              </div>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  bookingId={numericBookingId}
                  amount={amount}
                  type={type}
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

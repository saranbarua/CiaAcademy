import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { useBookingPaymentPolling } from "../data/api/useBookingPaymentPolling";

const stripePromise = loadStripe(
  "pk_test_51UEkyWBUzRTyeMD9Fucub4QdnGoLv9k8zzOAm4KG77qHGb4K7hGhCywFmvzyPKZKrlQmbjzf2GTe2OEhsO5LpBno00SeoMpNTL",
);

type Hint = "checking" | "processing" | "failed";

export const PaymentResultPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const numericBookingId = useMemo(
    () => (bookingId ? Number(bookingId) : null),
    [bookingId],
  );

  const [hint, setHint] = useState<Hint>("checking");

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");
    if (!clientSecret) {
      setHint("processing"); // no hint available — go straight to polling
      return;
    }

    stripePromise.then(async (stripe) => {
      if (!stripe) return;
      const { paymentIntent } =
        await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case "succeeded":
        case "processing":
          setHint("processing"); // still wait for the backend webhook
          break;
        case "requires_payment_method":
          setHint("failed"); // 3DS failed / card declined
          break;
        default:
          setHint("processing");
      }
    });
  }, [searchParams]);

  // The backend is always the final word, regardless of what Stripe's hint said.
  const { state } = useBookingPaymentPolling(numericBookingId, {
    skip: hint === "checking",
  });

  if (hint === "checking" || state === "confirming") {
    return (
      <ResultShell>
        <Loader2 className="w-8 h-8 text-indigo-600 mx-auto animate-spin" />
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
          Confirming your payment\u2026
        </p>
      </ResultShell>
    );
  }

  if (state === "confirmed") {
    return (
      <ResultShell>
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-4">
          Payment Confirmed
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Your booking has been updated.
        </p>
        <Link
          to="/my-account"
          className="inline-block mt-5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          View My Bookings
        </Link>
      </ResultShell>
    );
  }

  if (hint === "failed") {
    return (
      <ResultShell>
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-3">
          Payment Failed
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Your card verification didn't go through. Please try again with the
          same or a different card.
        </p>
        <Link
          to={`/payment/${bookingId}`}
          className="inline-block mt-5 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          Try Again
        </Link>
      </ResultShell>
    );
  }

  // timeout
  return (
    <ResultShell>
      <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-3">
        Still confirming
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-sm mx-auto">
        This is taking longer than usual. We'll email your receipt as soon as
        it's confirmed.
      </p>
      <Link
        to="/my-account"
        className="inline-block mt-5 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
      >
        Check My Bookings
      </Link>
    </ResultShell>
  );
};

function ResultShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEOHead
        title="Confirming Payment | Care International Academy"
        description=""
        canonicalUrl=""
      />
      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-700/80 shadow-xl text-center">
          {children}
        </div>
      </div>
    </>
  );
}

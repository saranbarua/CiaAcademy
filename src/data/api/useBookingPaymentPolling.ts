// src/data/api/useBookingPaymentPolling.ts
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import apiurl from "../../apiUrl/apiUrl";
import { fetchMyBookings } from "./bookingsApi";

export type PollState = "confirming" | "confirmed" | "timeout";

interface Options {
  /** Stop polling immediately and report this state (e.g. card was declined client-side). */
  skip?: boolean;
  intervalMs?: number;
  maxAttempts?: number;
}

function traineeAuthHeaders() {
  const token = Cookies.get("traineeToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * The authoritative source for "did the payment go through".
 *
 * Polls GET /payments/my/booking/:id/status, which asks Stripe directly
 * about any pending PaymentIntent and applies the same server-verified
 * update the webhook would — so confirmation lands even when webhooks
 * cannot reach the backend (local dev, slow delivery, etc.).
 *
 * Falls back to GET /bookings/my when talking to an older backend that
 * does not have the status endpoint yet.
 */
export function useBookingPaymentPolling(
  bookingId: number | null,
  { skip = false, intervalMs = 3000, maxAttempts = 20 }: Options = {},
) {
  const [state, setState] = useState<PollState>("confirming");
  const [booking, setBooking] = useState<any>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!bookingId || skip) return;

    let cancelled = false;
    attemptsRef.current = 0;

    const check = async () => {
      attemptsRef.current += 1;
      try {
        let match: any = null;

        const res = await fetch(
          `${apiurl.mainUrl}/payments/my/booking/${bookingId}/status`,
          { headers: { ...traineeAuthHeaders() } },
        );

        if (res.ok) {
          const data = await res.json();
          match = data.booking;
        } else if (res.status === 404 || res.status === 405) {
          // Older backend without the reconcile endpoint — booking flags
          // are only ever set by the webhook, so just read those.
          const bookings = await fetchMyBookings();
          match = (bookings || []).find((b: any) => b.id === bookingId);
        } else {
          return; // transient error — keep trying
        }

        if (cancelled || !match) return;

        const isConfirmed =
          match.depositPaid ||
          match.balancePaid ||
          match.status === "CONFIRMED" ||
          match.status === "PAID";

        if (isConfirmed) {
          setBooking(match);
          setState("confirmed");
          clearInterval(intervalId);
        } else if (attemptsRef.current >= maxAttempts) {
          setBooking(match);
          setState("timeout");
          clearInterval(intervalId);
        }
      } catch {
        // network hiccup — keep trying, don't fail the whole poll
      }
    };

    const intervalId = setInterval(check, intervalMs);
    check(); // fire immediately, don't wait for the first interval

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [bookingId, skip, intervalMs, maxAttempts]);

  return { state, booking };
}

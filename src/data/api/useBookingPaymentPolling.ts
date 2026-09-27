// src/hooks/useBookingPaymentPolling.ts
import { useEffect, useRef, useState } from "react";
import { fetchMyBookings } from "./bookingsApi";

export type PollState = "confirming" | "confirmed" | "timeout";

interface Options {
  /** Stop polling immediately and report this state (e.g. card was declined client-side). */
  skip?: boolean;
  intervalMs?: number;
  maxAttempts?: number;
}

/**
 * The ONLY authoritative source for "did the payment go through" — Stripe's
 * webhook is what actually flips depositPaid/balancePaid/status on the
 * booking, so we poll GET /bookings/my until that lands (or we give up).
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
        const bookings = await fetchMyBookings();
        if (cancelled) return;
        const match = (bookings || []).find((b: any) => b.id === bookingId);
        if (!match) return;

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

import Cookies from "js-cookie";
import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export type PaymentType = "deposit" | "balance";

function traineeAuthHeaders() {
  const token = Cookies.get("traineeToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  if (res.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }
  if (!res.ok) {
    let msg = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      msg = body.error || body.message || msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  return res.json();
}

export interface CreateIntentPayload {
  bookingId: number;
  type: PaymentType;
}

export interface CreateIntentResult {
  clientSecret: string;
  paymentId: number;
}

// NOTE: amount is deliberately NOT sent — the backend decides the exact
// figure from booking.depositAmount / booking.balanceAmount. Sending our own
// amount here would be ignored (or worse, out of sync with the booking).
export async function createMyPaymentIntent(
  payload: CreateIntentPayload,
): Promise<CreateIntentResult> {
  const res = await fetch(`${API_BASE}/payments/my/intent`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...traineeAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export interface ApiPayment {
  id: number;
  bookingId: number;
  stripePaymentIntentId: string;
  amount: string; // Decimal comes back as a string — use Number(amount)
  currency: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
  method: string;
  type: PaymentType;
  description?: string;
  failureReason?: string | null;
  paidAt?: string | null;
  createdAt: string;
}

export async function fetchPaymentsForBooking(
  bookingId: number,
): Promise<ApiPayment[]> {
  const res = await fetch(`${API_BASE}/payments/booking/${bookingId}`, {
    credentials: "include",
    headers: { ...traineeAuthHeaders() },
  });
  return handleResponse(res);
}

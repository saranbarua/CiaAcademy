// src/data/api/paymentsApi.ts
//
// NOTE: Per the current API docs, POST /payments/create-intent is documented
// under "Admin Endpoints" (Admin auth required). That can't be right for a
// trainee-facing checkout flow — a trainee can't hold an admin token. This
// file calls the endpoint with the TRAINEE's bearer token, on the assumption
// the backend will (or already does) accept trainee auth here too. If it
// still 401/403s, ask backend to add trainee access to this route (scoped so
// a trainee can only create an intent for their own booking).

import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

function getTraineeToken(): string | null {
  // Adjust this to however your app actually stores the trainee token
  // (e.g. read it from useTraineeAuth's context/localStorage key instead,
  // or wherever bookingsApi.ts pulls its Authorization header from).
  return localStorage.getItem("traineeToken");
}

export type PaymentType = "deposit" | "balance";

export interface CreatePaymentIntentPayload {
  bookingId: number;
  amount: number;
  type: PaymentType;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentId: number;
}

export async function createPaymentIntent(
  payload: CreatePaymentIntentPayload,
): Promise<CreatePaymentIntentResponse> {
  const token = getTraineeToken();

  const res = await fetch(`${API_BASE}/payments/create-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = "Could not start payment. Please try again.";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      // ignore parse errors, use default message
    }
    throw new Error(message);
  }

  return res.json();
}

export interface ApiPayment {
  id: number;
  bookingId: number;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCEEDED" | "FAILED";
  method: string;
  type: PaymentType;
  paidAt?: string | null;
  createdAt: string;
}

export async function fetchPaymentsForBooking(
  bookingId: number,
): Promise<ApiPayment[]> {
  const token = getTraineeToken();

  const res = await fetch(`${API_BASE}/payments/booking/${bookingId}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error("Could not load payment status.");
  }

  return res.json();
}

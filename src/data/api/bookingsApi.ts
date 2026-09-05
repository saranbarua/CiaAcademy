// src/data/api/bookingsApi.ts
import apiurl from "../../apiUrl/apiUrl";
import Cookies from "js-cookie";

const API_BASE = apiurl.mainUrl;

export interface ApiBookingPayment {
  id: number;
  amount: number;
  status: string;
  type: string;
}

export interface ApiBooking {
  id: number;
  bookingRef: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
  depositPaid: boolean;
  balancePaid: boolean;
  createdAt: string;
  course: {
    id: number;
    title: string;
    slug: string;
    thumbnailImage?: string | null;
  };
  schedule: {
    id: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    venue: { name: string; city: string };
  };
  payments: ApiBookingPayment[];
}

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
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchMyBookings(): Promise<ApiBooking[]> {
  const res = await fetch(`${API_BASE}/bookings/my`, {
    headers: { ...traineeAuthHeaders() },
  });
  return handleResponse(res);
}

export interface CreateBookingPayload {
  courseId: number;
  scheduleId: number;
  notes?: string;
  specialRequirements?: string;
}

export async function createBooking(payload: CreateBookingPayload) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...traineeAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

const BOOKING_STATUS_META: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  PENDING: { label: "Pending", color: "#9C5A17", bg: "#FBF0DF" },
  CONFIRMED: { label: "Confirmed", color: "#2F6F4E", bg: "#E9F3EC" },
  COMPLETED: { label: "Completed", color: "#2B4A73", bg: "#E9EEF6" },
  CANCELLED: { label: "Cancelled", color: "#9C3B2C", bg: "#F7E9E5" },
};

export function bookingStatusMeta(status: string) {
  return (
    BOOKING_STATUS_META[status] || {
      label: status,
      color: "#5B6472",
      bg: "#EEEDE8",
    }
  );
}

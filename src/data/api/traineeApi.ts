// src/data/api/traineeApi.ts
import apiurl from "@/src/apiUrl/apiUrl";
import Cookies from "js-cookie";

const API_BASE = apiurl.mainUrl;

export interface TraineeRegisterPayload {
  email: string;
  name: string;
  phone: string;
  password: string;
  dateOfBirth?: string;
  addressLine1?: string;
  city?: string;
  postcode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  employerName?: string;
  howDidYouHear?: string;
  marketingOptIn?: boolean;
}

export interface TraineeSummary {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export interface TraineeProfile extends TraineeSummary {
  dateOfBirth?: string;
  addressLine1?: string;
  city?: string;
  postcode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  employerName?: string;
  marketingOptIn?: boolean;
  createdAt?: string;
  bookings?: any[];
  certificates?: any[];
}

function traineeAuthHeaders() {
  const token = Cookies.get("traineeToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  if (res.status === 401) {
    // Session invalid/expired \u2014 clear stale cookies so the app doesn't loop
    Cookies.remove("traineeToken");
    Cookies.remove("traineeName");
    Cookies.remove("traineeEmail");
    throw new Error("Your session has expired. Please log in again.");
  }
  if (!res.ok) {
    let msg = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      msg = body.error || body.message || msg;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function registerTrainee(payload: TraineeRegisterPayload) {
  const res = await fetch(`${API_BASE}/trainees/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function loginTrainee(email: string, password: string) {
  const res = await fetch(`${API_BASE}/trainees/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res) as Promise<{
    token: string;
    trainee: TraineeSummary;
  }>;
}

export async function fetchMyProfile(): Promise<TraineeProfile> {
  const res = await fetch(`${API_BASE}/trainees/me`, {
    headers: { ...traineeAuthHeaders() },
  });
  return handleResponse(res);
}

export async function updateMyProfile(
  payload: Partial<TraineeProfile>,
): Promise<TraineeProfile> {
  const res = await fetch(`${API_BASE}/trainees/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...traineeAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_BASE}/trainees/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/trainees/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });
  return handleResponse(res);
}

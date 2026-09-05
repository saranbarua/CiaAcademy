// src/data/api/leadsApi.ts
import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface CreateLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
  courseInterest?: string;
}

export async function createLead(payload: CreateLeadPayload) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = "Could not submit your request. Please try again.";
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

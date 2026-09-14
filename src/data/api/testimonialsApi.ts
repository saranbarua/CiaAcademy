// src/data/api/testimonialsApi.ts
import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface ApiTestimonial {
  id: number;
  authorName: string;
  content: string;
  rating: number;
  courseName?: string | null;
  featured: boolean;
  status?: string;
  createdAt?: string;
}

export async function fetchApprovedTestimonials(): Promise<ApiTestimonial[]> {
  const res = await fetch(`${API_BASE}/testimonials/approved`);
  if (!res.ok) throw new Error("Could not load testimonials.");
  return res.json();
}

export async function fetchFeaturedTestimonials(): Promise<ApiTestimonial[]> {
  const res = await fetch(`${API_BASE}/testimonials/featured`);
  if (!res.ok) throw new Error("Could not load featured testimonials.");
  return res.json();
}

export function averageOf(testimonials: ApiTestimonial[]): number {
  const valid = (testimonials || []).filter(
    (t) => !!t && typeof t.rating === "number",
  );
  if (!valid.length) return 0;
  const sum = valid.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / valid.length) * 10) / 10;
}

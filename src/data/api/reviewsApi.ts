import Cookies from "js-cookie";
import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface ApiReview {
  id: number;
  courseId: number;
  traineeId: number;
  rating: number;
  title: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  trainee: {
    id: number;
    name: string;
  };
}

export async function fetchCourseReviews(
  courseId: number,
): Promise<ApiReview[]> {
  const res = await fetch(`${API_BASE}/reviews/course/${courseId}`);
  if (!res.ok) throw new Error("Could not load reviews for this course.");
  return res.json();
}

export function averageOf(reviews: ApiReview[]): number {
  if (!reviews?.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + (r?.rating ?? 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function ratingBreakdown(reviews: ApiReview[]): Record<number, number> {
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  (reviews || []).forEach((r) => {
    if (r && breakdown[r.rating] !== undefined) breakdown[r.rating] += 1;
  });
  return breakdown;
}

export function initialsOf(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-cyan-500 to-blue-500",
];

export function gradientFor(key: string): string {
  let hash = 0;
  const safeKey = key || "?";
  for (let i = 0; i < safeKey.length; i++)
    hash = (hash * 31 + safeKey.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}

export function formatReviewDate(iso?: string): string {
  if (!iso) return "\u2014";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Trainee-side: submit a review (POST /reviews)
// ---------------------------------------------------------------------------

function traineeAuthHeaders() {
  // Adjust this cookie key if trainee auth is stored under a different name
  const token = Cookies.get("traineeToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isTraineeLoggedIn(): boolean {
  return Boolean(Cookies.get("traineeToken"));
}

export interface CreateReviewPayload {
  courseId: number;
  rating: number;
  title: string;
  content: string;
}

export async function submitCourseReview(
  payload: CreateReviewPayload,
): Promise<ApiReview> {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...traineeAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error("Please log in to submit a review.");
  }
  if (!res.ok) {
    let msg = "Could not submit your review.";
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

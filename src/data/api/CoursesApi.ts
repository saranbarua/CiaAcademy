import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  _count: { courses: number };
}

export interface ApiSchedule {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: { name: string; city: string };
}

export interface ApiCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  level: "ENTRY_LEVEL" | "INTERMEDIATE" | "ADVANCED";
  price: number;
  discountedPrice: number | null;
  durationDays: number;
  durationHours: number;
  maxStudents: number;
  isPublished: boolean;
  thumbnailImage: string | null;
  whatYouLearn: string[];
  includes: string[];
  category: { id: number; name: string; slug: string };
  schedules: ApiSchedule[];
  reviews: { rating: number }[];
  _count: { reviews: number; bookings: number };
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error("Could not load data from the server.");
  return res.json();
}

export const fetchPublicCategories = () =>
  get<ApiCategory[]>("/categories/public");

export const fetchPublicCourses = (categorySlug?: string) => {
  const qs = categorySlug
    ? `?category=${encodeURIComponent(categorySlug)}`
    : "";
  return get<ApiCourse[]>(`/courses/public${qs}`);
};

export function averageRating(course: ApiCourse): number {
  if (!course.reviews?.length) return 0;
  const sum = course.reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / course.reviews.length) * 10) / 10;
}

export function levelLabel(level: ApiCourse["level"]): string {
  switch (level) {
    case "ENTRY_LEVEL":
      return "Entry Level";
    case "INTERMEDIATE":
      return "Intermediate";
    case "ADVANCED":
      return "Advanced";
    default:
      return level;
  }
}

export function durationLabel(course: ApiCourse): string {
  const parts = [];
  if (course.durationDays) parts.push(`${course.durationDays}d`);
  if (course.durationHours) parts.push(`${course.durationHours}h`);
  return parts.join(" \u00b7 ") || "\u2014";
}

export function nextScheduleVenue(course: ApiCourse): string | null {
  if (!course.schedules?.length) return null;
  const sorted = [...course.schedules].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
  return sorted[0]?.venue?.city || null;
}

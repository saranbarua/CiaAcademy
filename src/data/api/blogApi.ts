// src/data/api/blogApi.ts
import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface ApiBlogAuthor {
  id: number;
  name: string;
}

export interface ApiBlogListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  status: string;
  publishedAt: string;
  tags: string[];
  viewCount: number;
  author: ApiBlogAuthor;
}

export interface ApiBlogDetail extends ApiBlogListItem {
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

export async function fetchPublishedBlogs(): Promise<ApiBlogListItem[]> {
  const res = await fetch(`${API_BASE}/blog/published`);
  if (!res.ok) throw new Error("Could not load blog posts.");
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlogDetail> {
  const res = await fetch(`${API_BASE}/blog/slug/${slug}`);
  if (!res.ok) throw new Error("This article could not be found.");
  return res.json();
}

export function formatBlogDate(iso?: string): string {
  if (!iso) return "\u2014";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// No readTime field from the API — estimate it from word count (~200 wpm)
export function estimateReadTime(content?: string): string {
  if (!content) return "\u2014";
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
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

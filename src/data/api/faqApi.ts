import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface ApiFaq {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

export async function fetchActiveFaqs(): Promise<ApiFaq[]> {
  const res = await fetch(`${API_BASE}/faq/active`);
  if (!res.ok) throw new Error("Could not load FAQs.");
  return res.json();
}

export function sortedFaqs(faqs: ApiFaq[]): ApiFaq[] {
  return [...(faqs || [])]
    .filter((f) => !!f)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

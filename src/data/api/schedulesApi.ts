// src/data/api/schedulesApi.ts
import apiurl from "../../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

export interface ApiScheduleForCourse {
  id: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  maxStudents: number;
  currentStudents: number;
  venue: { name: string; city: string; postcode?: string };
  _count?: { bookings: number };
}

export async function fetchSchedulesForCourse(
  courseId: number,
): Promise<ApiScheduleForCourse[]> {
  const res = await fetch(`${API_BASE}/schedules/course/${courseId}`);
  if (!res.ok) throw new Error("Could not load schedules for this course.");
  return res.json();
}

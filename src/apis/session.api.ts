import { CreateSessionDto } from "@/types/session/create-session.api.dto";
import { GetAllSessionPayload } from "@/types/session/get-all-session.api.dto";
import { MarkAttendanceDto } from "@/types/session/mark-attendance.api.dto";
import { SessionDto } from "@/types/session/session.dto";
import { UpdateSessionDto } from "@/types/session/update-session.api.dto";

import axios from "axios";

// Create session
export async function createSession(
  courseId: string,
  sessionData: CreateSessionDto,
) {
  const response = await axios.post<SessionDto>(
    `/course/${courseId}/session`,
    sessionData,
  );
  return response.data;
}

// Get all sessions for a course
export async function getCourseSessions(params: GetAllSessionPayload) {
  const response = await axios.get<SessionDto>(
    `/course/${params.courseId}/session`,
    { params },
  );
  return response.data;
}

// Get session by ID
export async function getSessionById(id: string) {
  const response = await axios.get(`/session/${id}`);
  return response.data;
}

// Update session
export async function updateSession(id: string, updateData: UpdateSessionDto) {
  const response = await axios.patch<SessionDto>(`/session/${id}`, updateData);
  return response.data;
}

// Delete session
export async function deleteSession(id: string) {
  const response = await axios.delete(`/session/${id}`);
  return response.data;
}

// Mark attendance
export async function markAttendance(id: string, data: MarkAttendanceDto) {
  const response = await axios.post(`/session/${id}/attendance`, data);
  return response.data;
}

// Get session attendance
export async function getSessionAttendance(id: string) {
  const response = await axios.get(`/session/${id}/attendance`);
  return response.data;
}

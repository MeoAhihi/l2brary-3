import { useQuery } from "@tanstack/react-query";
import { getEnrollmentRosterByCourseId } from "@/apis/enrollment.api";

/**
 * Custom hook to get the roster of students by course ID.
 * @param courseId The ID of the course
 */
export function useStudentRosterQuery(courseId: string) {
  return useQuery({
    queryKey: ["course-student-roster", courseId],
    queryFn: async () => {
      const response = await getEnrollmentRosterByCourseId(courseId);
      return response.data;
    },
    enabled: !!courseId,
  });
}

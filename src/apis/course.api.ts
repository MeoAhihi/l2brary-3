import axiosClient from "@/connectors/AxiosRestConnector";
import { CoursePayload, GetCoursePayload } from "@/types/courses/payload";
import { CourseItem, CoursesResponse } from "@/types/courses/response";

export const createCourse = async (courseData: CoursePayload) => {
  const { data } = await axiosClient.post("/course", courseData);

  return data;
};

export const getCourses = async (params?: Partial<GetCoursePayload>) => {
  const { data } = await axiosClient.get<CoursesResponse>("/course", {
    params,
  });

  return data;
};

export const getPublicCourses = async (params?: Partial<GetCoursePayload>) => {
  const { data } = await axiosClient.get<CoursesResponse>("/course/public", {
    params,
  });

  return data;
};

export const getCourseGroups = async () => {
  const { data } = await axiosClient.get<string[]>("/course/groups");

  return data;
};

export const getCourseById = async (courseId: string) => {
  const { data } = await axiosClient.get<CourseItem | null>(
    `/course/${courseId}`,
  );

  return data;
};

export const updateCourse = async (
  courseId: string,
  courseData: Partial<CoursePayload>,
) => {
  const { data } = await axiosClient.patch(`/course/${courseId}`, courseData);

  return data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosClient.delete(`/course/${courseId}`);

  return data;
};

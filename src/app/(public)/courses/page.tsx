import CourseCard from "@/components/courses/course-card";
import CardGrid from "@/components/courses/card-grid";
import { Metadata } from "next";
import { Course } from "@/lib/courses";
import Pagination from "@/components/courses/pagination";
import CourseFilters from "@/components/courses/course-filter";
import CourseGroupCarousel from "@/components/courses/course-group-carosel";

export const metadata: Metadata = {
  title: "Courses | L2brary",
  description: "Browse available courses and learning opportunities",
};

export default function CoursesPage() {
  const courses: Course[] = [
    {
      id: "1",
      title: "Introduction to Programming",
      category: "Computer Science",
      status: "active",
    },
    {
      id: "2",
      title: "Advanced Mathematics",
      category: "Mathematics",
      status: "archived",
    },
    {
      id: "3",
      title: "Creative Writing",
      category: "Literature",
      status: "active",
    },
    {
      id: "4",
      title: "Introduction to Programming",
      category: "Computer Science",
      status: "active",
    },
    {
      id: "5",
      title: "Advanced Mathematics",
      category: "Mathematics",
      status: "archived",
    },
    {
      id: "6",
      title: "Creative Writing",
      category: "Literature",
      status: "active",
    },
  ]

  const groups = [
    {
      id: "1",
      name: "Group 1",
      courses: 10,
    },
    {
      id: "2",
      name: "Group 2",
      courses: 20,
    },
    {
      id: "3",
      name: "Group 3",
      courses: 30,
    },
    {
      id: "4",
      name: "Group 4",
      courses: 40,
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <CourseGroupCarousel groups={groups} />
        <p className="text-muted-foreground mb-8">
          Discover and enroll in courses to enhance your skills
        </p>

        <CourseFilters />
        <CardGrid
          courses={courses}
        />
        <Pagination total={100} page={2} limit={9} />


      </div>
    </div>
  );
}

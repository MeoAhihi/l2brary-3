export type Course = {
  id: string;
  title: string;
  category: string;
  status: "active" | "archived";
};

export const courses: Course[] = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Course ${i + 1}`,
  category: i % 2 === 0 ? "Design" : "Development",
  status: i % 3 === 0 ? "archived" : "active",
}));

export async function getCourses({
  page = 1,
  limit = 9,
  category,
  status,
  search,
}: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
}) {
  let filtered = [...courses];

  if (category) filtered = filtered.filter((i) => i.category === category);
  if (status) filtered = filtered.filter((i) => i.status === status);
  if (search)
    filtered = filtered.filter((i) =>
      i.title.toLowerCase().includes(search.toLowerCase())
    );

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { data: paginated, total };
}

import { getSessions } from "@/apis/ld.api";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";

export default async function SessionsPage({
  params,
}: {
  params: { "course-id": string };
}) {
  const courseId = params["course-id"];
  const sessions = await getSessions(courseId);

  return (
    <DataTable
      title="Danh sách các buổi học"
      columns={columns}
      data={sessions}
      createPage="/"
    />
  );
}

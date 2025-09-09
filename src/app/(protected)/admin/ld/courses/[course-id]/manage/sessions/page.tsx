import { getSessions } from "@/apis/ld.api";
import SessionsTable from "./session-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý buổi học",
  description: "Trang quản lý các buổi học cho khoá học",
};

type PageProps = {
  params: Promise<{
    "course-id": string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { "course-id": courseId } = await params;
  const sessions = await getSessions(courseId);

  return (
    <div className="p-6">
      <SessionsTable sessions={sessions} />
    </div>
  );
}

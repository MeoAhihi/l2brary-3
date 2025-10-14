import { Metadata } from "next";

import SessionsTable from "./session-table";

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

  return (
    <div className="p-6">
      <SessionsTable />
    </div>
  );
}

import { Metadata } from "next";
import { Suspense } from "react";

import { DataTableSkeleton } from "@/components/ui/data-table/data-table-skeleton";
import PageHeader from "@/components/ui/page-header";

import { CoursesTable } from "./CoursesTable";

export const metadata: Metadata = {
  title: "Courses | Admin | L2brary",
  description: "Manage all learning & development courses",
};

export default function AdminCoursesPage() {
  return (
    <div>
      <PageHeader pageTitle="Courses List" />
      <Suspense
        fallback={
          <DataTableSkeleton
            rowCount={10}
            columnCount={6}
            showHeader={true}
            showPagination={true}
          />
        }
      >
        <CoursesTable />
      </Suspense>
    </div>
  );
}

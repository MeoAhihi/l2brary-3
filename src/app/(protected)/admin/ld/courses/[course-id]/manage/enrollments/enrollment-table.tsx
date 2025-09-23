"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Enrollment } from "@/types/ld.types";
import { columns } from "./columns";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Search, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";

export function EnrollmentTable({
  enrollments,
}: {
  enrollments: Enrollment[];
}) {
  // DataTable expects data and columns as props
  return (
    <DataTable
      columns={columns}
      data={enrollments}
      header={() => (
        <div className="flex items-center justify-between">
          <CardTitle>Student Roster</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input placeholder="Search students..." className="w-64 pl-8" />
            </div>
          </div>
        </div>
      )}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}

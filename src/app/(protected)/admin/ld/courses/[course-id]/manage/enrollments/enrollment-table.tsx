"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Enrollment } from "@/types/ld.types";
import { columns } from "./columns";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Download, Search, Mail } from "lucide-react";
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
      header={(table) => (
        <div className="flex justify-between items-center">
          <CardTitle>Student Roster</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-8 w-64" />
            </div>
          </div>
        </div>
      )}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}

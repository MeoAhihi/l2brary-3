"use client";

import { FormEventHandler } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { useStudentRosterQuery } from "@/hooks/enrollments/useStudentRoster";

import { columns } from "./columns";

type ManualCheckinMembersTableProps = {
  courseId: string;
};

const handleCheckin: FormEventHandler = (e) => {
  e.preventDefault(); /* handle submit here */
};

export default function ManualCheckinMembersTable({
  courseId,
}: ManualCheckinMembersTableProps) {
  // Get session id from params prop
  const { data: enrollments, isLoading: isLoadong } =
    useStudentRosterQuery(courseId);

  if (isLoadong) {
    return <div>Đang tải danh sách thành viên...</div>;
  }
  return (
    <>
      <DataTable
        manualPagination={true}
        columns={columns}
        data={(enrollments ?? []).map((e) => e.user).filter((i) => !!i)}
        footer={(table) => (
          <div className="flex flex-col gap-4">
            <form
              className="flex flex-row items-center justify-between gap-2"
              onSubmit={handleCheckin}
            >
              <Input
                type="datetime-local"
                name="checkinTime"
                className="w-fit"
                defaultValue={new Date().toISOString().slice(0, 16)}
                aria-label="Check-in time"
              />
              <Button type="submit">Điểm danh</Button>
            </form>
          </div>
        )}
      />
    </>
  );
}

"use client";

import { FormEventHandler, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { useMarkAttendanceMutation } from "@/hooks";
import { EnrollmentItem } from "@/types/enrollment/response";

import { columns } from "./columns";

type ManualCheckinMembersTableProps = {
  sessionId: string;
  data: EnrollmentItem[];
};

const handleCheckin: FormEventHandler = (e) => {
  e.preventDefault(); /* handle submit here */
};

export default function ManualCheckinMembersTable({
  sessionId,
  data,
}: ManualCheckinMembersTableProps) {
  const attendance = useMarkAttendanceMutation();
  const [time, setTime] = useState<Date | undefined>(undefined);

  return (
    <>
      <DataTable
        manualPagination={true}
        columns={columns}
        data={(data ?? []).map((e) => e.user).filter((i) => !!i)}
        footer={(table) => (
          <div className="flex flex-col gap-4">
            <form
              className="flex flex-row items-center justify-between gap-2"
              onSubmit={handleCheckin}
            >
              {/* Get the checked user from the table's selected rows */}
              <Input
                type="datetime-local"
                name="checkinTime"
                className="w-fit"
                value={time ? time.toISOString().slice(0, 16) : ""}
                onChange={(e) =>
                  setTime(e.target.value ? new Date(e.target.value) : undefined)
                }
                aria-label="Check-in time"
              />
              <Button
                type="submit"
                onClick={() => {
                  // Retrieve the selected users from the table
                  const selectedUsers = table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original);
                  attendance.mutate(
                    {
                      sessionId,
                      attendanceData: {
                        userIds: selectedUsers.map((u) => u.id),
                        time,
                      },
                    },
                    {
                      onSuccess: () => {
                        // Clear selected users after successful check-in
                        table.resetRowSelection();
                        setTime(undefined);
                      },
                    },
                  );
                  // TODO: You may process selectedUsers as needed for check-in
                }}
              >
                Điểm danh
              </Button>
            </form>
          </div>
        )}
      />
    </>
  );
}

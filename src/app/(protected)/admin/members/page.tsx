"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import PageHeader from "@/components/ui/page-header";
import data from "@/constants/members.json";
// import { Metadata } from "next";
import { columns, TableHeader } from "./table.config";
import DownloadMembersListButton from "./download_members_list_btn";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";

// export const metadata: Metadata = {
//   title: "Members Management | Admin | L2brary",
//   description: "Manage and view all club members",
// };

export default function AdminMembersPage() {
  const members: any = data.map((member) => ({
    ...member,
    birthday: new Date(member.birthday),
  }));

  return (
    <>
      <PageHeader pageTitle="Danh sách thành viên CLB">
        <DownloadMembersListButton />
      </PageHeader>
      <div className="mb-4">
        <DataTable
          columns={columns}
          data={members}
          header={TableHeader}
          footer={DataTablePagination}
        />
      </div>
    </>
  );
}

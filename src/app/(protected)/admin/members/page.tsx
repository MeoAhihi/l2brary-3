import { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";

import DownloadMembersListButton from "./download_members_list_btn";
import MemberTable from "./member-table";

export const metadata: Metadata = {
  title: "Members Management | Admin | L2brary",
  description: "Manage and view all club members",
};

export default async function AdminMembersPage() {
  return (
    <>
      <PageHeader pageTitle="Danh sách thành viên CLB">
        <DownloadMembersListButton />
      </PageHeader>
      <div className="mb-4">
        <MemberTable members={[]} />
      </div>
    </>
  );
}

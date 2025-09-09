import PageHeader from "@/components/ui/page-header";
import DownloadMembersListButton from "./download_members_list_btn";
import MemberTable from "./member-table";
import { Metadata } from "next";
import { getMembers } from "@/apis/iam.api";

export const metadata: Metadata = {
  title: "Members Management | Admin | L2brary",
  description: "Manage and view all club members",
};

export default async function AdminMembersPage() {
  const members = await getMembers();

  return (
    <>
      <PageHeader pageTitle="Danh sách thành viên CLB">
        <DownloadMembersListButton />
      </PageHeader>
      <div className="mb-4">
        <MemberTable members={members} />
      </div>
    </>
  );
}

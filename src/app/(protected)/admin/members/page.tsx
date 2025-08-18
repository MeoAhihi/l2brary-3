import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import data from "@/constants/members.json";
import { Metadata } from "next";
import { columns } from "./columns";
import DownloadMembersListButton from "./download_members_list_btn";



export const metadata: Metadata = {
  title: "Members Management | Admin | L2brary",
  description: "Manage and view all club members",
};

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
      <div>
        <DataTable
          title="Thành viên"
          columns={columns}
          data={members}
          filterField={["fullname", "international_name"]}
          createPage="/dashboard/members/new"
        />
      </div>
    </>
  );
}

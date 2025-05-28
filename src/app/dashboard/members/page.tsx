
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { columns } from "./columns";

import data from "@/constants/members.json";
import DownloadMembersListButton from "./download_members_list_btn";

const members: any = data.map(member => ({ ...member, birthday: new Date(member.birthday) }));

export default function Page() {
  return (
    <>
      <PageHeader pageTitle="Danh sách thành viên CLB">
        <DownloadMembersListButton />
      </PageHeader>
      <div>
        <DataTable title="Thành viên" columns={columns} data={members} filterField={["fullname", "international_name"]} />
      </div>
    </>
  );
}

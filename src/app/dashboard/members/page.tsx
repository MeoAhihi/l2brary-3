
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { columns } from "./columns";

import data from "@/constants/members.json";
import { cookies } from "next/headers";
import DownloadMembersListButton from "./download_members_list_btn";
import { redirect } from "next/navigation";
import { getMembers } from "@/lib/api/members.api";

type Member = {
  _id: string,
  birthday: Date,
  email: string,
  fullname: string,
  is_male: boolean,
  phone_number: string,
  role: string,
}

// const members: any = data.map(member => ({ ...member, birthday: new Date(member.birthday) }));

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  const members = (await getMembers()).map((member: Member) => ({ ...member, birthday: new Date(member.birthday), id: member._id }));

  return (
    <>
      <PageHeader pageTitle="Danh sách thành viên CLB">
        <DownloadMembersListButton data={ members} />
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

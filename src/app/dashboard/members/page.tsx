import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import { columns, Member } from "./columns";

import data from "@/constants/members.json"

const members: any = data.map(member => ({ ...member, birthday: new Date(member.birthday) }));

export default function Page() {
  return (
    <>
      <PageHeader pageTitle="Danh sách tham gia lớp Anh Văn">
        <Button>
          <Plus />
          <a href="#">Tạo mới</a>
        </Button>
      </PageHeader>
      <div>
        <DataTable title="Thành viên" columns={columns} data={members} filterField={["fullname", "international_name"]}/> 
      </div>
    </>
  );
}

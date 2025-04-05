import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import { columns, Member } from "./columns";

const data: Member[] = [
  {
    id: "1",
    fullName: "Nguyễn Văn A",
    birthday: new Date("11/03/2003"),
    isMale: true,
    group: "1",
  },
  {
    id: "2",
    fullName: "Nguyễn Văn B",
    birthday: new Date("04/28/2003"),
    isMale: true,
    group: "2",
  },
  {
    id: "3",
    fullName: "Nguyễn Văn C",
    birthday: new Date("11/19/2005"),
    isMale: false,
    group: "1",
  },
  {
    id: "4",
    fullName: "Nguyễn Văn D",
    birthday: new Date("10/25/2001"),
    isMale: false,
    group: "2",
  },
  {
    id: "5",
    fullName: "Nguyễn Văn E",
    birthday: new Date("01/15/1998"),
    isMale: false,
    group: "1",
  },
  {
    id: "6",
    fullName: "Nguyễn Văn F",
    birthday: new Date("03/22/2002"),
    isMale: true,
    group: "2",
  },
  {
    id: "7",
    fullName: "Nguyễn Văn G",
    birthday: new Date("06/08/2000"),
    isMale: true,
    group: "1",
  },
  {
    id: "8",
    fullName: "Nguyễn Văn H",
    birthday: new Date("05/17/1999"),
    isMale: true,
    group: "2",
  },
  {
    id: "9",
    fullName: "Nguyễn Văn I",
    birthday: new Date("02/28/2003"),
    isMale: false,
    group: "1",
  },
  {
    id: "10",
    fullName: "Nguyễn Văn J",
    birthday: new Date("11/03/2003"),
    isMale: true,
    group: "2",
  },
  {
    id: "11",
    fullName: "Nguyễn Văn K",
    birthday: new Date("09/19/2005"),
    isMale: false,
    group: "1",
  },
  {
    id: "12",
    fullName: "Nguyễn Văn L",
    birthday: new Date("08/11/2004"),
    isMale: true,
    group: "2",
  },
];

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
        <DataTable title="Thành viên" columns={columns} data={data} />
      </div>
    </>
  );
}

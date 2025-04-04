import { DataTable } from "@/components/ui/data-table";
import { Class, columns } from "./columns";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const data: Class[] = [
  {
    id: '1',
    name: "AV thứ 5",
    day: "Thứ 5",
    startTime: "19:00",
    endTime: "21:00",
  }, {
    id: "2",
    name: "AV chủ nhật",
    day: "Chủ nhật",
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: "3",
    name: "Phiên dịch",
    day: "Chủ Nhật",
    startTime: "15:00",
    endTime: "17:00",
  }
]

export default function Page() {
  return (
    <>
      <PageHeader pageTitle="Tổng quan các lớp học của Anh Văn">
        <Button>
          <Plus />
          <Link href="#">Tạo mới</Link>
        </Button>
      </PageHeader>
      <div>
        <DataTable columns={columns} data={data} title="Danh sách Lớp học" createPage="/dashboard/create" filterField="name" />
      </div>
    </>
  )
}
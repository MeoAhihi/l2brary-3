import { DataTable } from "@/components/ui/data-table";
import { Class, columns } from "./columns";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const data: Class[] = [
  {
    id: "1",
    name: "Thí nghiệm Vật Lý",
    day: "Thứ 7",
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: "2",
    name: "Phương pháp Nghiên cứu Khoa học",
    day: "Thứ 7",
    startTime: "14:00",
    endTime: "17:00",
  },
  {
    id: "3",
    name: "Hoạt động Dã ngoại",
    day: "Chủ Nhật",
    startTime: "09:00",
    endTime: "15:00",
  },
];

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
        <DataTable
          columns={columns}
          data={data}
          title="Danh sách Lớp học"
          createPage="/dashboard/create"
          filterField="name"
        />
      </div>
    </>
  );
}

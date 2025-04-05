import MemberList from "@/components/member-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Download, Pencil, Plus } from "lucide-react";
import { columns } from "./columns";
import { MyChart } from "./my-chart";

const data = [
  {
    id: 1,
    avatarUrl: "https://picsum.photos/500",
    name: "Nguyễn Văn A",
    position: "lớp trưởng",
  },
  {
    id: 2,
    avatarUrl: "https://picsum.photos/500",
    name: "Trần Thị B",
    position: "lớp phó",
  },
  {
    id: 3,
    avatarUrl: "https://picsum.photos/500",
    name: "Lê Văn C",
    position: "thư ký",
  },
  {
    id: 4,
    avatarUrl: "https://picsum.photos/500",
    name: "Phạm Thị D",
    position: "tổ trưởng",
  },
  {
    id: 5,
    avatarUrl: "https://picsum.photos/500",
    name: "Hoàng Văn E",
    position: "tổ phó",
  },
  {
    id: 6,
    avatarUrl: "https://picsum.photos/500",
    name: "Đỗ Thị F",
    position: "thủ quỹ",
  },
];

const sessions = [
  {
    id: "1",
    title: "Buổi 1",
    description: "Học về HTML",
    date: new Date("10/20/2023"),
    startTime: "19:30",
    endTime: "20:00",
    attendees: 18,
    link: "#",
  },
  {
    id: "2",
    title: "Buổi 2",
    description: "Học về CSS",
    date: new Date("10/27/2023"),
    startTime: "20:00",
    endTime: "20:30",
    attendees: 30,
    link: "#",
  },
  {
    id: "3",
    title: "Buổi 3",
    description: "Học về Javascript",
    date: new Date("11/03/2023"),
    startTime: "20:30",
    endTime: "21:00",
    attendees: 23,
    link: "#",
  },
  {
    id: "4",
    title: "Buổi 4",
    description: "Học về React",
    date: new Date("11/10/2023"),
    startTime: "21:00",
    endTime: "21:30",
    attendees: 73,
    link: "#",
  },
  {
    id: "5",
    title: "Buổi 5",
    description: "Học về NextJS",
    date: new Date("11/17/2023"),
    startTime: "21:30",
    endTime: "22:00",
    attendees: 20,
    link: "#",
  },
  {
    id: "6",
    title: "Buổi 6",
    description: "Học về TailwindCSS",
    date: new Date("11/24/2023"),
    startTime: "22:00",
    endTime: "22:30",
    attendees: 21,
    link: "#",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        pageTitle="AV thứ 5"
        descriptions={["Online", "Thứ 5", "19:30 - 21:00"]}
      >
        <Button>
          <Plus />
          Tạo mới
        </Button>
        <Button variant="outline">
          <Pencil />
          Chỉnh sửa
        </Button>
      </PageHeader>
      <div className="max-w-fit">
        <h2 className="text-2xl font-semibold">Ban cán sự</h2>
        <MemberList
          className="my-4"
          members={data}
          optionalFields={[{ key: "position", label: "Position" }]}
          showHeader={false}
        />
      </div>
      <Separator />
      <div className="my-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold text-center">Buổi học</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download />
              Tải về
            </Button>
            <Button>
              <Plus />
              Tạo mới
            </Button>
          </div>
        </div>
        <MyChart />
        <DataTable
          title="Danh sách Buổi học"
          columns={columns}
          data={sessions}
          createPage=""
          filterField="title"
        />
      </div>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-16 my-4">
        <div>
          <h2 className="text-2xl font-semibold text-center">Tổ 1</h2>
          <MemberList members={data} showHeader={false} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center">Tổ 2</h2>
          <MemberList members={data} showHeader={false} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center">Chưa phân tổ</h2>
          <MemberList members={data} showHeader={false} />
        </div>
      </div>
    </>
  );
}

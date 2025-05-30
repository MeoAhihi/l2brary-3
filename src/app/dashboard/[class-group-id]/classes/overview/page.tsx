import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

import classes from "@/constants/classes.json";

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
          data={classes}
          title="Danh sách Lớp học"
          createPage="/dashboard/create"
          filterField="name"
        />
      </div>
    </>
  );
}

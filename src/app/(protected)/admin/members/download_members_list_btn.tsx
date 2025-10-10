"use client";

import { DownloadIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { exportExcel } from "@/lib/export-excel";

export default function DownloadMembersListButton() {
  return (
    <Button
      onClick={() => exportExcel("danh_sach_thanh_vien_clb", "danh_sach", [])}
    >
      <DownloadIcon />
      Tải xuống
    </Button>
  );
}

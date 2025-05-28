"use client"

import { exportExcel } from '@/lib/export-excel'
import { DownloadIcon } from 'lucide-react'
import React from 'react'

import members from '@/constants/members.json'
import { Button } from '@/components/ui/button'

export default function DownloadMembersListButton() {
  return (
    <Button
      onClick={() => exportExcel("danh_sach_thanh_vien_clb", "danh_sach", members)}
    >
      <DownloadIcon />
      Tải xuống
    </Button>
  )
}

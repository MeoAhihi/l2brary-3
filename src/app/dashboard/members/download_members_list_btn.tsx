"use client"

import { exportExcel } from '@/lib/export-excel'
import { DownloadIcon } from 'lucide-react'

// import members from '@/constants/members.json'
import { Button } from '@/components/ui/button'
import { getMembers } from '@/lib/api/members.api'
import { Member } from './columns'

export default async function DownloadMembersListButton({ data }: { data: Member[] }) {
  // const members = await getMembers()

  return (
    <Button
      onClick={() => exportExcel("danh_sach_thanh_vien_clb", "danh_sach", data)}
    >
      <DownloadIcon />
      Tải xuống
    </Button>
  )
}


import { MemberForm } from "@/components/member-form"
import { getMember } from "@/lib/api/members.api"

// import members from "@/constants/members.json"

export default async function Page({ params }: { params: Promise<{ memberId: string }> }) {
  const { memberId } = await params
  // const member = members.find((member) => member.id === memberId)
  const member = await getMember(memberId)
  console.log("🚀 ~ Page ~ member:", member)
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-semibold text-2xl mb-5">Cập nhật thông tin của &quot;{member?.fullname}&quot;</h1>
      <MemberForm defaultValues={member} />
    </div>
  )
}

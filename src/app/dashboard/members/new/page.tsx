import { MemberForm } from "@/components/member/member-form";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-semibold text-2xl mb-5">Tạo thành viên mới</h1>
      <MemberForm />
    </div>
  );
}

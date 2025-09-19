import members from "@/constants/members.json";
import { MemberSchema } from "@/types/iam.schema";
import { Member, Role } from "@/types/iam.types";

export async function getMembers(): Promise<Member[]> {
  const response = await fetch("http://localhost:3000/user-profiles", {
    method: "GET",
  });
  const data = await response.json();
  return data.map((member: any) => ({
    id: member.id,
    fullname: member.fullName,
    international_name: member.internationalName,
    birthday: member.birthdate,
    role: "admin",
    is_male: member.gender === "male",
    group: "unknown",
    school_class: "unlkown",
    phone_number: member.phoneNumber,
    email: member.email,
  }));
}

export async function getMember(id: string): Promise<any> {
  const response = await fetch(`http://localhost:3000/user-profiles/${id}`, {
    method: "GET",
  });
  const data = await response.json();

  return {
    name: data.fullName,
    email: data.email,
    phone: data.phoneNumber,
    gender: data.gender === "male" ? "Nam" : "Nữ",
    birthday: data.birthdate,
    avatarUrl: "/image.png",
    role: "Thành viên",
    status: "Đang hoạt động",
    className: "11A15",
  };
}

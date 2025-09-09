import members from "@/constants/members.json";
import { MemberSchema } from "@/types/iam.schema";
import { Member } from "@/types/iam.types";

export async function getMembers(): Promise<Member[]> {
  // In a real API, you might fetch from a database or remote source.
  // Here, we return the imported members list, mapping the role to the Role enum.
  // Use zod to validate and transform each member
  return members.map((member) => MemberSchema.parse(member));
}

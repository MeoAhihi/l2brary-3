import ShortMemberList, {
  MemberRowProps,
} from "@/components/short-member-list";

const data: MemberRowProps[] = [
  {
    avatarUrl: "https://picsum.photos/500",
    name: "John Doe",
    dateOfBirth: "1990-01-01",
  },
  {
    avatarUrl: "https://picsum.photos/501",
    name: "Luna Starweaver",
    dateOfBirth: "1723-06-21",
  },
  {
    avatarUrl: "https://picsum.photos/502",
    name: "Thistle Moonwhisper",
    dateOfBirth: "1856-12-12",
  },
  {
    avatarUrl: "https://picsum.photos/503",
    name: "Rowan Duskdancer",
    dateOfBirth: "1645-03-15",
  },
  {
    avatarUrl: "https://picsum.photos/504",
    name: "Iris Shadowmend",
    dateOfBirth: "1934-09-30",
  },
];

export default function Page() {
  return <ShortMemberList members={data} />;
}

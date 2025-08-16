import MemberList from "@/components/member/member-list";
import PageHeader from "@/components/ui/page-header";
const data = [
  {
    id: "1",
    fullName: "Nguyễn Văn A",
    birthday: new Date("11/03/2003"),
    isMale: true,
    group: "1",
  },
  {
    id: "2",
    fullName: "Nguyễn Văn B",
    birthday: new Date("04/28/2003"),
    isMale: true,
    group: "2",
  },
  {
    id: "3",
    fullName: "Nguyễn Văn C",
    birthday: new Date("11/19/2005"),
    isMale: false,
    group: "1",
  },
  {
    id: "4",
    fullName: "Nguyễn Văn D",
    birthday: new Date("10/25/2001"),
    isMale: false,
    group: "2",
  },
  {
    id: "5",
    fullName: "Nguyễn Văn E",
    birthday: new Date("01/15/1998"),
    isMale: false,
    group: "1",
  },
  {
    id: "6",
    fullName: "Nguyễn Văn F",
    birthday: new Date("03/22/2002"),
    isMale: true,
    group: "2",
  },
  {
    id: "7",
    fullName: "Nguyễn Văn G",
    birthday: new Date("06/08/2000"),
    isMale: true,
    group: "1",
  },
  {
    id: "8",
    fullName: "Nguyễn Văn H",
    birthday: new Date("05/17/1999"),
    isMale: true,
    group: "2",
  },
  {
    id: "9",
    fullName: "Nguyễn Văn I",
    birthday: new Date("02/28/2003"),
    isMale: false,
    group: "1",
  },
  {
    id: "10",
    fullName: "Nguyễn Văn J",
    birthday: new Date("11/03/2003"),
    isMale: true,
    group: "2",
  },
  {
    id: "11",
    fullName: "Nguyễn Văn K",
    birthday: new Date("09/19/2005"),
    isMale: false,
    group: "1",
  },
  {
    id: "12",
    fullName: "Nguyễn Văn L",
    birthday: new Date("08/11/2004"),
    isMale: true,
    group: "2",
  },
].map((member) => ({
  avatarUrl: "lorem.photos/500",
  name: member.fullName,
  birthday: member.birthday,
}));

export default function Page() {
  return (
    <>
      <PageHeader pageTitle="Sinh nhật thành viên lớp Anh Văn" />
      {[
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ].map((month, index) => (
        <div key={index} className="max-w-fit">
          <h2 className="text-1xl font-semibold">{month}</h2>
          <MemberList
            className="my-4"
            members={
              data.filter((member) => member.birthday.getMonth() === index) ||
              []
            }
            optionalFields={[
              {
                key: "birthday",
                label: "Ngày sinh",
                render: (birthday) => (
                  <p>{birthday.toLocaleDateString("en-GB")}</p>
                ),
              },
            ]}
            showHeader={false}
          />
        </div>
      ))}
    </>
  );
}

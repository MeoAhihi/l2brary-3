import MemberList from "@/components/member-list";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import data from "@/constants/members.json";
const birthdays = data.map((member) => ({
  avatarUrl: "lorem.photos/500",
  name: member.fullname,
  birthday: new Date(member.birthday),
}));

const months = [
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
];

const membersByMonth = months.map((month, index) => {
  return {
    month,
    members:
      birthdays.filter((member) => member.birthday.getMonth() === index) || [],
  };
});

export default function Page() {
  return (
    <>
      <PageHeader pageTitle="Sinh nhật thành viên CLB" />
      <div className="flex flex-col items-center space-y-4 mb-4">
        {membersByMonth.map((month, index) => (
          <div key={index} className="max-w-fit">
            <Card>
              <CardContent>
                <h2 className="text-1xl font-semibold">{month.month}</h2>
                {month.members.length ? (
                  <MemberList
                    className="my-4"
                    members={month.members}
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
                ) : (
                  "Chưa có sinh nhật vào tháng này"
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

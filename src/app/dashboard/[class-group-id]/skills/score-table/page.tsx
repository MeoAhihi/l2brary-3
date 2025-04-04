import { DataTable } from "@/components/ui/data-table"
import PageHeader from "@/components/ui/page-header"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn A",
    birthday: new Date("11/03/2003"),
    isMale: true,
    group: "1",
    "Stamp": 15,
    "Điểm Nổ lực": 58,
    "Điểm Soạn bài": 17,
    "Điểm Tác phong": 29,
    "Điểm thi": 5,
  },
  {
    id: "2",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn B",
    birthday: new Date("04/28/2003"),
    isMale: true,
    group: "2",
    "Stamp": 15,
    "Điểm Nổ lực": 19,
    "Điểm Soạn bài": 31,
    "Điểm Tác phong": 45,
    "Điểm thi": 10
  },
  {
    id: "3",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn C",
    birthday: new Date("11/19/2005"),
    isMale: false,
    group: "1",
    "Stamp": 25,
    "Điểm Nổ lực": 42,
    "Điểm Soạn bài": 28,
    "Điểm Tác phong": 35,
    "Điểm thi": 8
  }, {
    id: "4",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn D",
    birthday: new Date("10/25/2001"),
    isMale: false,
    group: "2",
    "Stamp": 18,
    "Điểm Nổ lực": 37,
    "Điểm Soạn bài": 22,
    "Điểm Tác phong": 40,
    "Điểm thi": 7
  }, {
    id: "5",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn E",
    birthday: new Date("01/15/1998"),
    isMale: false,
    group: "1",
    "Stamp": 20,
    "Điểm Nổ lực": 45,
    "Điểm Soạn bài": 30,
    "Điểm Tác phong": 38,
    "Điểm thi": 9
  },
  {
    id: "6",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn F",
    birthday: new Date("03/22/2002"),
    isMale: true,
    group: "2",
    "Stamp": 22,
    "Điểm Nổ lực": 39,
    "Điểm Soạn bài": 25,
    "Điểm Tác phong": 42,
    "Điểm thi": 6
  }, {
    id: "7",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn G",
    birthday: new Date("06/08/2000"),
    isMale: true,
    group: "1",
    "Stamp": 17,
    "Điểm Nổ lực": 41,
    "Điểm Soạn bài": 29,
    "Điểm Tác phong": 36,
    "Điểm thi": 8
  }, {
    id: "8",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn H",
    birthday: new Date("05/17/1999"),
    isMale: true,
    group: "2",
    "Stamp": 21,
    "Điểm Nổ lực": 44,
    "Điểm Soạn bài": 27,
    "Điểm Tác phong": 39,
    "Điểm thi": 7
  },
  {
    id: "9",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn I",
    birthday: new Date("02/28/2003"),
    isMale: false,
    group: "1",
    "Stamp": 19,
    "Điểm Nổ lực": 38,
    "Điểm Soạn bài": 24,
    "Điểm Tác phong": 41,
    "Điểm thi": 9
  }, {
    id: "10",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn J",
    birthday: new Date("11/03/2003"),
    isMale: true,
    group: "2",
    "Stamp": 23,
    "Điểm Nổ lực": 43,
    "Điểm Soạn bài": 26,
    "Điểm Tác phong": 37,
    "Điểm thi": 8
  }, {
    id: "11",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn K",
    birthday: new Date("09/19/2005"),
    isMale: false,
    group: "1",
    "Stamp": 16,
    "Điểm Nổ lực": 40,
    "Điểm Soạn bài": 23,
    "Điểm Tác phong": 43,
    "Điểm thi": 6
  }, {
    id: "12",
    avatarUrl: "https://picsum.photos/200",
    fullName: "Nguyễn Văn L",
    birthday: new Date("08/11/2004"),
    isMale: true,
    group: "2",
    "Stamp": 24,
    "Điểm Nổ lực": 36,
    "Điểm Soạn bài": 28,
    "Điểm Tác phong": 34,
    "Điểm thi": 7
  }
]

export default function Page() {
  return (
    <>
      <PageHeader pageTitle="Bảng điểm" />
      <DataTable
        title="Bảng điểm"
        data={data}
        columns={columns}
        filterField="fullName"
      />
    </>
  )
}
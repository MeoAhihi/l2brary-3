import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import PageHeader from '@/components/ui/page-header'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Timeline, TimelineDescription, TimelineHeader, TimelineItem, TimelineTime, TimelineTitle } from '@/components/ui/timeline'
import { Cake, Mail, PhoneCall, Users, VenusAndMars } from 'lucide-react'
import Image from 'next/image'

import timelineData from "@/constants/activities.json"
import classJoining from "@/constants/class-joining.json"
import { MyChart } from './chart'

function page() {
  const date = new Date()
  return (
    <>
      <PageHeader pageTitle="Hồ sơ cá nhân" descriptions={[{ label: `Hoạt động gần nhất: ${date.toLocaleString()}`, status: "warning" }, { label: `Tham gia gần nhất: ${date.toLocaleString()}`, status: "danger" }]} />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 space-y-4">
          <Card className="relative">
            <Badge className="absolute top-2.5 left-2.5 text-xs font-semibold">
              Quản lý
            </Badge>
            <CardContent>
              <Image src="/image.png" alt="avatar" className="rounded-full mx-auto" width={200} height={200} />
              <h3 className="text-lg font-semibold text-center mt-4">Nguyen Van A</h3>
              <div className="flex flex-col gap-y-4 mt-2">
                <div className='flex flex-row gap-3 items-center'>
                  <PhoneCall opacity={0.3} size={18} />
                  (+84) 123 456 789
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <Mail opacity={0.3} size={18} />
                  m@example.com
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <Users opacity={0.3} size={18} />
                  12A3
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <VenusAndMars opacity={0.3} size={18} />
                  Nam
                </div>
                <div className='flex flex-row gap-3 items-center'>
                  <Cake opacity={0.3} size={18} />
                  12/03/2003
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className='font-semibold'>Chứng nhận lớp học</h3>
            </CardHeader>
            <CardContent className='flex gap-2 flex-wrap'>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className='font-semibold'>Kinh nghiệm</h3>
            </CardHeader>
            <CardContent className='flex gap-2 flex-wrap'>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className='font-semibold'>Tham gia Sự kiện</h3>
            </CardHeader>
            <CardContent className='flex gap-2 flex-wrap'>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
              <Badge variant="outline">Ahihi</Badge>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <h3 className='font-semibold'>Lớp học</h3>
            </CardHeader>
            <CardContent>
              <MyChart />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lớp học</TableHead>
                    <TableHead>Tỉ lệ tham gia</TableHead>
                    <TableHead>Tỉ lệ Bài tập</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classJoining.map(row => (
                    <TableRow>
                      <TableCell>{row.class}</TableCell>
                      <TableCell>{row.join_rate}%</TableCell>
                      <TableCell>{row.quiz_rate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-2xl font-medium mb-4">Hoạt động Gần đây</h2>
              <Timeline className='mt-8'>
                {timelineData.map((item) => (
                  <TimelineItem key={item.id}>
                    <TimelineHeader>
                      <TimelineTime>{item.time}</TimelineTime>
                      <TimelineTitle>{item.title}</TimelineTitle>
                    </TimelineHeader>
                    {item.description && (
                      <TimelineDescription>{item.description}</TimelineDescription>
                    )}
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}


export default page

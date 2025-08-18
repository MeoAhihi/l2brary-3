import { Metadata } from "next";
// import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, CheckCircle, XCircle, Clock, Filter, Download, Mail, Users, BookOpen, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Course Enrollments | Admin | L2brary",
  description: "Manage course enrollments and approval requests",
};

// interface EnrollmentsPageProps {
//   params: Promise<{
//     "course-id": string;
//   }>;
// }

// Mock data for enrollments
const enrollments = [
  {
    id: 1,
    student: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: "/avatars/alice.jpg",
    },
    status: "approved",
    enrolledDate: "2024-01-15",
    lastActivity: "2024-01-20",
    progress: 75,
    grade: "A",
    attendance: 95,
    assignments: 8,
    completed: 6,
  },
  {
    id: 2,
    student: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      avatar: "/avatars/bob.jpg",
    },
    status: "pending",
    enrolledDate: "2024-01-18",
    lastActivity: "2024-01-19",
    progress: 0,
    grade: "N/A",
    attendance: 0,
    assignments: 0,
    completed: 0,
  },
  {
    id: 3,
    student: {
      name: "Carol Davis",
      email: "carol.davis@example.com",
      avatar: "/avatars/carol.jpg",
    },
    status: "approved",
    enrolledDate: "2024-01-10",
    lastActivity: "2024-01-21",
    progress: 45,
    grade: "B+",
    attendance: 88,
    assignments: 8,
    completed: 4,
  },
  {
    id: 4,
    student: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/avatars/david.jpg",
    },
    status: "rejected",
    enrolledDate: "2024-01-12",
    lastActivity: "2024-01-12",
    progress: 0,
    grade: "N/A",
    attendance: 0,
    assignments: 0,
    completed: 0,
  },
  {
    id: 5,
    student: {
      name: "Emma Thompson",
      email: "emma.thompson@example.com",
      avatar: "/avatars/emma.jpg",
    },
    status: "approved",
    enrolledDate: "2024-01-08",
    lastActivity: "2024-01-22",
    progress: 92,
    grade: "A+",
    attendance: 100,
    assignments: 8,
    completed: 8,
  },
  {
    id: 6,
    student: {
      name: "Frank Miller",
      email: "frank.miller@example.com",
      avatar: "/avatars/frank.jpg",
    },
    status: "approved",
    enrolledDate: "2024-01-14",
    lastActivity: "2024-01-18",
    progress: 60,
    grade: "B",
    attendance: 75,
    assignments: 8,
    completed: 5,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

export default function EnrollmentsPage(/*{ params }: EnrollmentsPageProps*/) {
 // const { "course-id": courseId } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enrollments</h2>
          <p className="text-muted-foreground">Manage student enrollments and approval requests</p>
        </div>
        <Button>Export List</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <div className="text-sm text-muted-foreground">Total Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <div className="text-sm text-muted-foreground">Pending Approval</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-muted-foreground">Active This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">78.5%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Student Roster</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-8 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={enrollment.student.avatar} />
                        <AvatarFallback>
                          {enrollment.student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{enrollment.student.name}</div>
                        <div className="text-sm text-muted-foreground">{enrollment.student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(enrollment.status)}
                      {getStatusBadge(enrollment.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={enrollment.grade === "N/A" ? "secondary" : "default"}>
                      {enrollment.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${enrollment.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{enrollment.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{enrollment.completed}/{enrollment.assignments}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{enrollment.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{enrollment.lastActivity}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Progress
                        </DropdownMenuItem>
                        {enrollment.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              23 of 32 assignments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              4 of 6 students active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Mail className="h-6 w-6 mb-2" />
              <span>Send Bulk Message</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span>Export Roster</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Add Students</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

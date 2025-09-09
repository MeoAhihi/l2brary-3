import { Enrollment, EnrollmentStatus } from "@/types/ld.types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

const getStatusBadge = (status: EnrollmentStatus) => {
  switch (status) {
    case EnrollmentStatus.APPROVED:
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case EnrollmentStatus.PENDING:
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case EnrollmentStatus.REJECTED:
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusIcon = (status: EnrollmentStatus) => {
  switch (status) {
    case EnrollmentStatus.APPROVED:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case EnrollmentStatus.PENDING:
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case EnrollmentStatus.REJECTED:
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

export const columns: ColumnDef<Enrollment>[] = [
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original.student;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={student.avatar} />
            <AvatarFallback>
              {student.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{student.name}</div>
            <div className="text-sm text-muted-foreground">{student.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        {getStatusIcon(row.original.status)}
        {getStatusBadge(row.original.status)}
      </div>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <Badge variant={row.original.grade === "N/A" ? "secondary" : "default"}>
        {row.original.grade}
      </Badge>
    ),
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="w-12 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${row.original.attendance}%` }}
          ></div>
        </div>
        <span className="text-sm text-muted-foreground">
          {row.original.attendance}%
        </span>
      </div>
    ),
  },
  {
    accessorKey: "assignments",
    header: "Assignments",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">
          {row.original.completed}/{row.original.assignments}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${row.original.progress}%` }}
          ></div>
        </div>
        <span className="text-sm text-muted-foreground">
          {row.original.progress}%
        </span>
      </div>
    ),
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{row.original.lastActivity}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const enrollment = row.original;
      return (
        <div className="text-right">
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
              {enrollment.status === EnrollmentStatus.PENDING && (
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
        </div>
      );
    },
  },
];

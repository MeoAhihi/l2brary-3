import { getMembers } from "@/apis/iam.api";
import { getStudentAttendances } from "@/apis/ld.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/ui/stat-card";
import { CheckSquare, Clock, UserCheck, Users, UserX, X } from "lucide-react";
import ManualCheckinMembersTable from "./manual-checkin-members-table";
import { Metadata } from "next";

const studentAttendances = await getStudentAttendances();

export const metadata: Metadata = {
  title: "Check-in Management | Admin | L2brary",
  description: "Manage student check-ins for the session",
};

export default async function CheckInPage() {
  const members = await getMembers();

  const presentCount = studentAttendances.filter((s) => s.checkedIn).length;
  const absentCount = studentAttendances.filter((s) => !s.checkedIn).length;
  const lateCount = studentAttendances.filter(
    (s) => s.status === "late",
  ).length;

  return (
    <div className="space-y-6">
      {/* Check-in Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Present"
          icon={<UserCheck className="h-4 w-4 text-green-600" />}
          value={<span className="text-green-600">{presentCount}</span>}
          description={`${((presentCount / studentAttendances.length) * 100).toFixed(1)}% of total`}
        />
        <StatCard
          title="Absent"
          icon={<UserX className="h-4 w-4 text-red-600" />}
          value={<span className="text-red-600">{absentCount}</span>}
          description={`${((absentCount / studentAttendances.length) * 100).toFixed(1)}% of total
`}
        />
        <StatCard
          title="Late"
          icon={<Clock className="h-4 w-4 text-yellow-600" />}
          value={<span className="text-yellow-600">{lateCount}</span>}
          description={`${((lateCount / studentAttendances.length) * 100).toFixed(1)}% of total`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Check-in */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Quick Check-in
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="student-search">Search Student</Label>
                <Input
                  id="student-search"
                  placeholder="Enter student name or email..."
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Check In
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Quick Check-in
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Manual check in */}
            <ManualCheckinMembersTable members={members} />
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentAttendances.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={student.checkedIn}
                    className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                  />
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {student.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {student.checkedIn ? (
                    <>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          Checked in at {student.checkInTime}
                        </p>
                        <Badge
                          variant={
                            student.status === "late" ? "secondary" : "default"
                          }
                          className={
                            student.status === "late"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }
                        >
                          {student.status === "late" ? "Late" : "Present"}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">
                        Not checked in
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800"
                      >
                        Absent
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

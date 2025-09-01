"use client";
import { CheckSquare, X, Clock, Users, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StatCard } from "@/components/ui/stat-card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useParams } from "next/navigation";
import Head from "next/head";
import { getStudentAttendances } from "@/apis/ld.api";

const studentAttendances = await getStudentAttendances();

export default function CheckInPage() {
  const { "session-id": sessionId } = useParams();

  const presentCount = studentAttendances.filter((s) => s.checkedIn).length;
  const absentCount = studentAttendances.filter((s) => !s.checkedIn).length;
  const lateCount = studentAttendances.filter(
    (s) => s.status === "late"
  ).length;

  return (
    <>
      <Head>
        <title>Check-in Management | Admin | L2brary</title>
        <meta
          name="description"
          content="Manage student check-ins for the session"
        />
      </Head>
      <div className="space-y-6">
        {/* Check-in Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Present"
            icon={() => <UserCheck className="h-4 w-4 text-green-600" />}
            value={<span className="text-green-600">{presentCount}</span>}
            description={`${((presentCount / studentAttendances.length) * 100).toFixed(1)}% of total`}
          />
          <StatCard
            title="Absent"
            icon={() => <UserX className="h-4 w-4 text-red-600" />}
            value={<span className="text-red-600">{absentCount}</span>}
            description={`${((absentCount / studentAttendances.length) * 100).toFixed(1)}% of total
`}
          />
          <StatCard
            title="Late"
            icon={() => <Clock className="h-4 w-4 text-yellow-600" />}
            value={<span className="text-yellow-600">{lateCount}</span>}
            description={`${((lateCount / studentAttendances.length) * 100).toFixed(1)}% of total`}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
                    <CheckSquare className="h-4 w-4 mr-2" />
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
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Find the selected row(s) from the DataTable
                    // Since DataTable is a generic component, we need a ref or state to access selected rows.
                    // We'll use a ref to the DataTable and expose a getSelectedRows method.
                    // For this mockup, we'll just log a placeholder.
                    // In a real implementation, you would lift the selected rows state up.
                    // Example:
                    // const selected = ...;
                    // console.log(selected.map(row => row.name));
                    alert(
                      "Log out selected member name(s) - implement selection logic in DataTable"
                    );
                  }}
                  className="mb-2"
                >
                  Log Out Selected Member Name(s)
                </Button>
                <DataTable
                  title="Điểm danh Thủ công"
                  columns={columns}
                  data={studentAttendances}
                />
              </div>
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
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={student.checkedIn}
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
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
                      <p className="text-sm text-muted-foreground">
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
                              student.status === "late"
                                ? "secondary"
                                : "default"
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
                        <p className="text-sm text-muted-foreground">
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

        {/* Bulk Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline">
              <CheckSquare className="h-4 w-4 mr-2" />
              Check In All
            </Button>
            <Button variant="outline">
              <X className="h-4 w-4 mr-2" />
              Mark All Absent
            </Button>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Mark Selected Late
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

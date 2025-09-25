import { BookOpen, Calendar, CheckCircle, Users } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Enrollment } from "@/types/ld.types";

import { EnrollmentTable } from "./enrollment-table";

export const metadata: Metadata = {
  title: "Course Enrollments | Admin | L2brary",
  description: "Manage course enrollments and approval requests",
};

export default async function EnrollmentsPage(/*{ params }: EnrollmentsPageProps*/) {
  // const { "course-id": courseId } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enrollments</h2>
          <p className="text-muted-foreground">
            Manage student enrollments and approval requests
          </p>
        </div>
        <Button>Export List</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <div className="text-muted-foreground text-sm">
                Total Enrolled
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <div className="text-muted-foreground text-sm">
                Pending Approval
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-muted-foreground text-sm">
                Active This Week
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">78.5%</div>
              <div className="text-muted-foreground text-sm">
                Completion Rate
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <EnrollmentTable enrollments={[]} />
        </CardContent>
      </Card>

      {/* Student Performance Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Grade"
          value="B+"
          icon={<BookOpen className="text-muted-foreground h-4 w-4" />}
          description="+0.3 from last week"
        />
        <StatCard
          title="Average Attendance"
          value="87%"
          icon={<Calendar className="text-muted-foreground h-4 w-4" />}
          description="+2% from last week"
        />
        <StatCard
          title="Assignment Completion"
          value="73%"
          icon={<CheckCircle className="text-muted-foreground h-4 w-4" />}
          description="23 of 32 assignments"
        />
        <StatCard
          title="Active Students"
          value="89%"
          icon={<Users className="text-muted-foreground h-4 w-4" />}
          description="4 of 6 students active"
        />
      </div>
    </div>
  );
}

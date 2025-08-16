import { Metadata } from "next";
import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/toggle";

export const metadata: Metadata = {
  title: "Course Settings | Admin | L2brary",
  description: "Manage course settings and configuration",
};

interface SettingsPageProps {
  params: Promise<{
    "course-id": string;
  }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { "course-id": courseId } = use(params);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course-name">Course Name</Label>
              <Input id="course-name" placeholder="Enter course name" defaultValue="Advanced Physics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-code">Course Code</Label>
              <Input id="course-code" placeholder="Enter course code" defaultValue="PHY101" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter course description"
              defaultValue="An advanced course covering fundamental principles of physics including mechanics, thermodynamics, and quantum physics."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="science">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select defaultValue="intermediate">
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access & Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="public-course">Public Course</Label>
              <p className="text-sm text-muted-foreground">Allow anyone to view and enroll in this course</p>
            </div>
            {/* <Switch id="public-course" /> */}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="require-approval">Require Approval</Label>
              <p className="text-sm text-muted-foreground">Manually approve enrollment requests</p>
            </div>
            {/* <Switch id="require-approval" defaultChecked /> */}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allow-guest">Allow Guest Access</Label>
              <p className="text-sm text-muted-foreground">Allow unregistered users to preview course content</p>
            </div>
            {/* <Switch id="allow-guest" /> */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" defaultValue="2024-01-15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" defaultValue="2024-06-15" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-students">Maximum Students</Label>
              <Input id="max-students" type="number" placeholder="Enter max students" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollment-deadline">Enrollment Deadline</Label>
              <Input id="enrollment-deadline" type="date" defaultValue="2024-01-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

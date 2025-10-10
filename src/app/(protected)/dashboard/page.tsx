import { Metadata } from "next";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard | L2brary",
  description: "Your personal dashboard and overview",
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/my-progress"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                View My Progress
              </Link>
              <Link
                href="/profile"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                Edit Profile
              </Link>
              <Link
                href="/log-activity"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                Log Activity
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/courses"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                Browse Courses
              </Link>
              <Link
                href="/knowledge"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                Knowledge Base
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/knowledge/posts/new"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                Create Post
              </Link>
              <Link
                href="/about"
                className="hover:bg-muted block rounded-md p-2 text-sm"
              >
                About L2brary
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

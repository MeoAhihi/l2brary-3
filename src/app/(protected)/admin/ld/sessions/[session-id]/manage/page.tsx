import {
  BarChart3,
  Calendar,
  CheckSquare,
  Clock,
  Gamepad2,
  Settings,
  Stamp,
  TrendingUp,
  Users,
} from "lucide-react";
import { Metadata } from "next";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = {
  title: "Session Overview | Admin | L2brary",
  description: "Session overview and analytics",
};

interface ManageSessionPageProps {
  params: Promise<{
    "session-id": string;
  }>;
}

export default function ManageSessionPage({}: ManageSessionPageProps) {
  return (
    <div className="space-y-6">
      {/* Session Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Participants"
          icon={<Users className="h-4 w-4" />}
          value={45}
          description="+5 from last session"
        />

        <StatCard
          title="Checked In"
          icon={<CheckSquare className="h-4 w-4" />}
          value={42}
          description="93% attendance rate"
        />

        <StatCard
          title="Stamps Given"
          icon={<Stamp className="h-4 w-4" />}
          value={28}
          description="For participation"
        />

        <StatCard
          title="Games Played"
          icon={<Gamepad2 className="h-4 w-4" />}
          value={3}
          description="Average score: 85%"
        />
        <StatCard
          title="Total Games"
          icon={<Gamepad2 className="h-4 w-4" />}
          value={3}
          description="2 completed"
        />

        <StatCard
          title="Active Games"
          icon={<Clock className="h-4 w-4" />}
          value={1}
          description="Currently running"
        />

        <StatCard
          title="Total Participants"
          icon={<Users className="h-4 w-4" />}
          value={45}
          description="Across all games"
        />

        <StatCard
          title="Average Score"
          icon={<BarChart3 className="h-4 w-4" />}
          value="85%"
          description="Overall performance"
        />
      </div>

      {/* Session Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Session Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Date:</span>
              <span className="text-muted-foreground text-sm">
                December 15, 2024
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Time:</span>
              <span className="text-muted-foreground text-sm">
                14:00 - 16:00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Duration:</span>
              <span className="text-muted-foreground text-sm">2 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Course:</span>
              <span className="text-muted-foreground text-sm">
                Vật lý Lý thuyết
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <CheckSquare className="mr-2 h-4 w-4" />
              Manage Check-ins
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Stamp className="mr-2 h-4 w-4" />
              Add Stamps
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Gamepad2 className="mr-2 h-4 w-4" />
              Record Game Results
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Session Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">John Doe checked in</p>
                <p className="text-muted-foreground text-xs">2 minutes ago</p>
              </div>
              <Badge variant="secondary">Check-in</Badge>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Jane Smith received a stamp
                </p>
                <p className="text-muted-foreground text-xs">5 minutes ago</p>
              </div>
              <Badge variant="secondary">Stamp</Badge>
            </div>

            <div className="flex items-center gap-4 rounded-lg border p-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/03.png" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Mike Johnson completed game
                </p>
                <p className="text-muted-foreground text-xs">8 minutes ago</p>
              </div>
              <Badge variant="secondary">Game</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

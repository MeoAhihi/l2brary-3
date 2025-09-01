import { Metadata } from "next";
import { use } from "react";
import {
  Settings,
  Clock,
  Users,
  Calendar,
  MapPin,
  Save,
  Trash2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Session Settings | Admin | L2brary",
  description: "Manage session configuration and settings",
};

interface SettingsPageProps {
  params: Promise<{
    "session-id": string;
  }>;
}

export default function SettingsPage({ params }: SettingsPageProps) {
  const { "session-id": sessionId } = use(params);

  return (
    <div className="space-y-6">
      {/* Session Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Session Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="session-name">Session Name</Label>
              <Input
                id="session-name"
                defaultValue="Buổi học Vật lý Lý thuyết"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Select defaultValue="physics">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physics">Vật lý Lý thuyết</SelectItem>
                  <SelectItem value="math">Toán học</SelectItem>
                  <SelectItem value="chemistry">Hóa học</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Buổi học về các khái niệm cơ bản của vật lý lý thuyết, bao gồm cơ học lượng tử và thuyết tương đối."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Schedule Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="session-date">Date</Label>
              <Input
                id="session-date"
                type="date"
                defaultValue="2024-12-15"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="session-time">Time</Label>
              <Input
                id="session-time"
                type="time"
                defaultValue="14:00"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="duration">Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                defaultValue="2"
                min="0.5"
                step="0.5"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="gmt+7">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmt+7">GMT+7 (Vietnam)</SelectItem>
                  <SelectItem value="gmt+8">GMT+8 (Singapore)</SelectItem>
                  <SelectItem value="gmt+0">GMT+0 (London)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="location-type">Location Type</Label>
              <Select defaultValue="physical">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Location</SelectItem>
                  <SelectItem value="virtual">Virtual Meeting</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="room">Room/Meeting ID</Label>
              <Input id="room" defaultValue="Room 301" className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              defaultValue="123 Đường ABC, Quận 1, TP.HCM"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Attendance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Attendance Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="max-participants">Maximum Participants</Label>
              <Input
                id="max-participants"
                type="number"
                defaultValue="50"
                min="1"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="late-threshold">Late Threshold (minutes)</Label>
              <Input
                id="late-threshold"
                type="number"
                defaultValue="15"
                min="0"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-checkin">Auto Check-in</Label>
              <p className="text-sm text-muted-foreground">
                Automatically check in students when they join
              </p>
            </div>
            <Switch aria-label="Auto check-in" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allow-late-join">Allow Late Join</Label>
              <p className="text-sm text-muted-foreground">
                Allow students to join after the session starts
              </p>
            </div>
            <Switch aria-label="Allow late join" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Game Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Game Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-games">Enable Games</Label>
              <p className="text-sm text-muted-foreground">
                Allow games during this session
              </p>
            </div>
            <Switch aria-label="Enable games" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-scoring">Auto Scoring</Label>
              <p className="text-sm text-muted-foreground">
                Automatically calculate game scores
              </p>
            </div>
            <Switch aria-label="Auto scoring" defaultChecked />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="max-games">Maximum Games per Session</Label>
              <Input
                id="max-games"
                type="number"
                defaultValue="5"
                min="1"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="game-timeout">Game Timeout (minutes)</Label>
              <Input
                id="game-timeout"
                type="number"
                defaultValue="30"
                min="1"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send email notifications to participants
              </p>
            </div>
            <Switch aria-label="Email notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send SMS notifications to participants
              </p>
            </div>
            <Switch aria-label="SMS notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminder-notifications">
                Reminder Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Send reminder notifications before session
              </p>
            </div>
            <Switch aria-label="Reminder notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Session
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

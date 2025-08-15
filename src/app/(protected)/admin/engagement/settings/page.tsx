import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engagement Settings | Admin | L2brary",
  description: "Manage activity types and engagement settings",
};

export default function EngagementSettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Engagement Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage activity types and engagement configuration
        </p>
        
        {/* Activity types management will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Activity Types</h3>
            <p className="text-sm text-muted-foreground">
              Manage offline activities that Monitors can log (e.g., "Room Setup", "Presentation")
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Activity Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Activity type settings and scoring configuration will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Engagement Rules</h3>
            <p className="text-sm text-muted-foreground">
              Engagement tracking rules and settings will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

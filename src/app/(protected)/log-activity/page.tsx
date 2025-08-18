import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log Activity | L2brary",
  description: "Log offline member contributions and activities",
};

export default function LogActivityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Log Activity</h1>
        <p className="text-muted-foreground mb-8">
          Record offline member contributions and activities
        </p>

        {/* Activity logging form will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Activity Logging Form</h3>
            <p className="text-sm text-muted-foreground">
              Form to log member activities will be implemented here
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Activity Types</h3>
            <p className="text-sm text-muted-foreground">
              Available activity types (e.g., &quot;Room Setup&quot;, &quot;Presentation&quot;) will be listed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

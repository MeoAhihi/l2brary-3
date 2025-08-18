import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Analytics | Admin | L2brary",
  description: "Club growth and membership trends dashboard",
};

export default function GrowthAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Growth Analytics</h1>
        <p className="text-muted-foreground mb-8">
          Track membership growth and demographic trends
        </p>
        
        {/* Growth analytics dashboard will be implemented here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Membership Growth</h3>
            <p className="text-sm text-muted-foreground">
              Membership growth charts and trends will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Demographics</h3>
            <p className="text-sm text-muted-foreground">
              Demographic analysis and member composition will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Retention Metrics</h3>
            <p className="text-sm text-muted-foreground">
              Member retention and engagement metrics will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

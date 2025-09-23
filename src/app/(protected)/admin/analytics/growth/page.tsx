import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth Analytics | Admin | L2brary",
  description: "Club growth and membership trends dashboard",
};

export default function GrowthAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Growth Analytics</h1>
        <p className="text-muted-foreground mb-8">
          Track membership growth and demographic trends
        </p>

        {/* Growth analytics dashboard will be implemented here */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Membership Growth</h3>
            <p className="text-muted-foreground text-sm">
              Membership growth charts and trends will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Demographics</h3>
            <p className="text-muted-foreground text-sm">
              Demographic analysis and member composition will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Retention Metrics</h3>
            <p className="text-muted-foreground text-sm">
              Member retention and engagement metrics will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

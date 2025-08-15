import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Details | Admin | L2brary",
  description: "View member details and information",
};

interface MemberDetailPageProps {
  params: {
    user_id: string;
  };
}

export default function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { user_id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Member Details</h1>
        <p className="text-muted-foreground mb-8">
          User ID: {user_id}
        </p>
        
        {/* Member details will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Member Information</h3>
            <p className="text-sm text-muted-foreground">
              Complete member profile will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Member Actions</h3>
            <p className="text-sm text-muted-foreground">
              Edit and management actions will be available here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

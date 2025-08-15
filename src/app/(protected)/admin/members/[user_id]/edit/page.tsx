import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Member | Admin | L2brary",
  description: "Edit member profile and information",
};

interface EditMemberPageProps {
  params: {
    user_id: string;
  };
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const { user_id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Member</h1>
        <p className="text-muted-foreground mb-8">
          Edit member profile for User ID: {user_id}
        </p>
        
        {/* Member edit form will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Edit Form</h3>
            <p className="text-sm text-muted-foreground">
              Member profile edit form will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Rank Management</h3>
            <p className="text-sm text-muted-foreground">
              Rank and status management options will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Save Actions</h3>
            <p className="text-sm text-muted-foreground">
              Save and cancel buttons will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

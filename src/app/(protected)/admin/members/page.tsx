import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members Management | Admin | L2brary",
  description: "Manage and view all club members",
};

export default function AdminMembersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Members Management</h1>
        <p className="text-muted-foreground mb-8">
          View and manage all club members
        </p>
        
        {/* Members table will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Members List</h3>
            <p className="text-sm text-muted-foreground">
              Members table with search and filtering will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Member Actions</h3>
            <p className="text-sm text-muted-foreground">
              Bulk actions and member management tools will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | L2brary",
  description: "View and manage your personal profile information",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <p className="text-muted-foreground mb-8">
          View and manage your personal information and status
        </p>
        
        {/* Profile information will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
              Profile details will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Club Status</h3>
            <p className="text-sm text-muted-foreground">
              Member status and rank information will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Account Settings</h3>
            <p className="text-sm text-muted-foreground">
              Account management options will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

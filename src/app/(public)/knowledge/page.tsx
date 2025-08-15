import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Hub | L2brary",
  description: "Browse and discover knowledge posts from the community",
};

export default function KnowledgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Knowledge Hub</h1>
        <p className="text-muted-foreground mb-8">
          Discover insights and knowledge shared by the community
        </p>
        
        {/* Knowledge posts listing will be implemented here */}
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Knowledge Posts</h3>
            <p className="text-sm text-muted-foreground">
              Reverse-chronological list of post titles will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

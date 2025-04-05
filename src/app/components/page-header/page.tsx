import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <PageHeader
      pageTitle="Ahihi Class"
      descriptions={["online", "Monday", "19:30-21:00"]}
    >
      <Button>ahihi</Button>
      <Button variant="outline">ahihi</Button>
      <Button variant="destructive">ahihi</Button>
    </PageHeader>
  );
}

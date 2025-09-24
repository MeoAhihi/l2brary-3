import { Card, CardContent, CardHeader, CardTitle } from "./card";

export function StatCard({
  title,
  icon: Icon,
  value,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}

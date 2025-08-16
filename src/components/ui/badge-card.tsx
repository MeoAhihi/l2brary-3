import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BadgeCardProps {
  title: string;
  items: string[];
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function BadgeCard({ title, items, variant = "outline" }: BadgeCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {items.map((item) => (
          <Badge key={item} variant={variant}>
            {item}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

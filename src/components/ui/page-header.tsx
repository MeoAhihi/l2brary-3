import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Description =
  | string
  | {
      label: string;
      status?: "normal" | "warning" | "danger";
    };

export default function PageHeader({
  pageTitle,
  descriptions = [],
  children,
}: {
  pageTitle: string;
  descriptions?: Description[];
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-sm text-gray-500">
            {descriptions.map((description) =>
              typeof description === "string" ? (
                <Badge
                  key={description}
                  className="text-xs font-semibold mx-1"
                  variant="secondary"
                >
                  {description}
                </Badge>
              ) : (
                <Badge
                  key={description.label}
                  className={`text-xs font-semibold mx-1 ${
                    description.status === "normal"
                      ? "bg-gray-100 text-gray-500"
                      : description.status === "warning"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                  }`}
                >
                  {description.label}
                </Badge>
              ),
            )}
          </p>
        </div>
        <div className="flex gap-2">{children}</div>
      </div>
      <Separator className="my-4" />
    </>
  );
}

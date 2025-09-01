import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Member = {
  id: number | string;
  name: string;
  internationalName?: string;
  avatar?: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 32,
    maxSize: 32,
  },
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <Avatar className="h-8 w-8">
          {member.avatar ? (
            <AvatarImage src={member.avatar} alt={member.name} />
          ) : null}
          <AvatarFallback>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
    size: 40,
    maxSize: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => {
      const name = row.original.name || "";
      const parts = name.trim().split(" ");
      const lastName = parts.length > 1 ? parts[parts.length - 1] : name;
      return <span>{lastName}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "internationalName",
    header: "International Name",
    cell: ({ row }) =>
      row.original.internationalName ? (
        <span className="text-muted-foreground">
          {row.original.internationalName}
        </span>
      ) : (
        <span className="text-muted-foreground italic">N/A</span>
      ),
  },
];

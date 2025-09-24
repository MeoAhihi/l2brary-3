import { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export type Member = {
  id: number | string;
  fullname: string;
  internationalName?: string;
  avatar?: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
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
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center gap-1">
        Thành viên
        <button
          type="button"
          className="ml-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          aria-label="Sort"
        >
          {column.getIsSorted() === "asc"
            ? "▲"
            : column.getIsSorted() === "desc"
              ? "▼"
              : "↕"}
        </button>
      </div>
    ),
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-8 w-8">
            {member.avatar ? (
              <AvatarImage src={member.avatar} alt={member.fullname} />
            ) : null}
            <AvatarFallback>
              {member.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {row.original.fullname}
        </div>
      );
    },
    sortingFn: (a, b) => {
      const getLastName = (fullname: string = "") => {
        const parts = fullname.trim().split(" ");
        return parts.length > 1
          ? parts[parts.length - 1].toLowerCase()
          : fullname.toLowerCase();
      };
      const lastNameA = getLastName(a.original.fullname);
      const lastNameB = getLastName(b.original.fullname);
      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0;
    },
    enableSorting: true,
  },
  {
    accessorKey: "internationalName",
    header: "Tên Quốc tế",
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

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

export type Member = {
  id: string;
  fullName: string;
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
      return (
        <div className="flex flex-row items-center gap-2">
          {row.original.fullName}
        </div>
      );
    },
    sortingFn: (a, b) => {
      const getLastName = (fullName: string = "") => {
        const parts = fullName.trim().split(" ");
        return parts.length > 1
          ? parts[parts.length - 1].toLowerCase()
          : fullName.toLowerCase();
      };
      const lastNameA = getLastName(a.original.fullName);
      const lastNameB = getLastName(b.original.fullName);
      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0;
    },
    enableSorting: true,
  },
];

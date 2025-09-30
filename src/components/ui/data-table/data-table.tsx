"use client";

import {
  ColumnDef, // Manages pagination of table rows
  ColumnFiltersState, // Retrieves the core row model without sorting or filtering
  flexRender, // Hook to create and use a table instance
  getCoreRowModel, // Represents the current state of column filters
  getFilteredRowModel, // Gets the sorted rows based on the current sorting state
  getPaginationRowModel, // Represents the current sorting state of the table
  getSortedRowModel, // Renders table cells with flexible JSX components
  SortingState,
  Table as TableType, // Defines the structure of a column in the table
  useReactTable, // Hook to create and use a table instance
} from "@tanstack/react-table";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
type TableRenderer<TData> = (table: TableType<TData>) => React.ReactNode;
// eslint-disable-next-line no-unused-vars
type RowClickHandler<TData> = (row: TData) => void;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  header?: TableRenderer<TData>;
  footer?: TableRenderer<TData>;
  onRowClick?: RowClickHandler<TData>;
  selectedRowId?: string;
  // Pagination props for URL synchronization
  initialPageIndex?: number;
  initialPageSize?: number;
  // Server-side pagination props
  manualPagination?: boolean;
  pageCount?: number;
}

/**
 * DataTable is a client component that defines and renders a table using TanStack Table.
 * It manages sorting and filtering state locally, and renders table headers, body, and optional header/footer content.
 * You must define table component for specific page with "use client" before using
 * @template TData - The type of the data objects in the table.
 * @template TValue - The type of the value for each column.
 *
 * @param {Object} props - The props for the DataTable component.
 * @param {ColumnDef<TData, TValue>[]} props.columns - The column definitions for the table.
 * @param {TData[]} [props.data=[]] - The data to display in the table.
 * @param {(table: TableType<TData>) => React.ReactNode} [props.header] - Optional function to render custom header content.
 * @param {(table: TableType<TData>) => React.ReactNode} [props.footer] - Optional function to render custom footer content.
 * @param {(row: TData) => void} [props.onRowClick] - Optional function to handle row clicks.
 * @param {string} [props.selectedRowId] - Optional ID of the selected row.
 *
 * @returns {JSX.Element} The rendered table component.
 *
 * @example
 * <DataTable columns={columns} data={data} onRowClick={handleRowClick} selectedRowId={selectedId} />
 */
export function DataTable<TData, TValue>({
  columns,
  data = [],
  header,
  footer,
  onRowClick,
  selectedRowId,
  initialPageIndex = 0,
  initialPageSize = 10,
  manualPagination = false,
  pageCount,
}: DataTableProps<TData, TValue>) {
  // State for sorting and column filters
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  // Define the table instance using TanStack Table's useReactTable hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    manualPagination,
    pageCount: manualPagination ? pageCount : undefined,
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="flex flex-col gap-3">
      {/* Optional custom header */}
      {header && header(table)}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>#</TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const original = row.original as unknown;
                const candidateId =
                  typeof original === "object" &&
                  original !== null &&
                  "id" in original
                    ? (original as { id?: unknown }).id
                    : undefined;
                const resolvedId =
                  typeof candidateId === "string" ? candidateId : undefined;
                const isSelected = Boolean(
                  selectedRowId && resolvedId && resolvedId === selectedRowId,
                );
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected && "selected"}
                    className={cn(
                      isSelected ? "bg-muted/50" : undefined,
                      !isSelected && onRowClick
                        ? "hover:bg-muted/50 cursor-pointer"
                        : undefined,
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    <TableCell>{row.index + 1}</TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Optional custom footer */}
      {footer && footer(table)}
    </div>
  );
}

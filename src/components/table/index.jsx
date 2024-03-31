import * as React from "react";

import { cn } from "@/lib/utils";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TablePagination, TableToolbar } from "./components";
import { ScrollArea } from "../ui";

export const TableContainer = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
));
TableContainer.displayName = "Table";

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-stone-900 font-medium text-stone-50 dark:bg-stone-50 dark:text-stone-900", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-primary-400 transition-colors hover:bg-stone-100/10 data-[state=selected]:bg-stone-100/10 dark:hover:bg-stone-800/50 dark:data-[state=selected]:bg-stone-800",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] dark:text-stone-400",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-stone-500 dark:text-stone-400", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

const Table = (props) => {
  const { noFilter = false } = props;
  const [rowSelection, setRowSelection] = React.useState(props.rowSelection ?? {});
  const [columnVisibility, setColumnVisibility] = React.useState(props.columnVisibility ?? {});
  const [columnFilters, setColumnFilters] = React.useState(props.columnFilters ?? []);
  const [sorting, setSorting] = React.useState(props.sorting ?? []);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4 h-full">
      {!noFilter && <TableToolbar table={table} filter={props.filter} />}
      <div className="rounded-md border border-primary-300 shadow">
        <TableContainer className="bg-primary-50/75 rounded-md">
          <TableHeader className="bg-primary-500/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-primary-400 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const length = headerGroup.headers.length - 1;

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.index === 0 && "rounded-ss-md",
                        header.index === length && "rounded-se-md",
                        "px-3.5 py-2 h-6 text-primary-900 font-bold"
                      )}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-primary-700/10">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={props.columns.length} className="h-48 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableContainer>
      </div>
      <TablePagination table={table} {...props} />
    </div>
  );
};

export default Table;

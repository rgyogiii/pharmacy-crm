import { cn } from "@/lib/utils";

import { TableHeader } from "@/components/table/components";

import PesoIcon from "~icons/custom/peso";

const formatNumber = (num) => {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => <TableHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="max-w-[150px] text-xs font-bold text-primary-900">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <TableHeader column={column} title="Quantity" className="w-[60px]" />,
    cell: ({ row }) => <div className="text-primary-900 w-[60px] truncate font-medium">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "items",
    header: ({ column }) => <TableHeader column={column} title="Items" className="w-[60px]" />,
    cell: ({ row }) => (
      <div className="text-primary-900 w-[60px] truncate font-medium">{formatNumber(row.getValue("items"))}</div>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => <TableHeader column={column} title="Total" className="w-[60px]" />,
    cell: ({ row }) => (
      <div className="text-primary-900 w-[100px] truncate font-medium flex items-center gap-0.5">
        <PesoIcon className="h-3 w-3" />
        <div className="w-full text-sm"> {formatNumber(row.getValue("total"))}</div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <TableHeader column={column} title="Customer" />,
    cell: ({ row }) => (
      <div className="text-primary-900 w-[160px] text-xs truncate font-semibold text-lowercase capitalize">
        {row.getValue("customer") ?? "not assigned"}
      </div>
    ),
  },
  {
    accessorKey: "physician",
    header: ({ column }) => <TableHeader column={column} title="Physician" />,
    cell: ({ row }) => (
      <div className="text-primary-900 w-[160px] truncate text-xs font-semibold text-lowercase capitalize">
        {row.getValue("physician") ?? "not assigned"}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => <TableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <div className="w-[160px] truncate font-medium text-sm text-lowercase capitalize">{row.getValue("date")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

export default columns;

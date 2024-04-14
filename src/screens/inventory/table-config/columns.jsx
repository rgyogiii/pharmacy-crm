import { cn } from "@/lib/utils";

import { TableHeader } from "@/components/table/components";
import Actions from "./actions";
import Status from "./status";

import PesoIcon from "~icons/custom/peso";

const formatNumber = (num) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const columns = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <TableHeader column={column} title="ID" className="w-[150px]" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] text-xs font-medium text-primary-900">
        {row.getValue("_id")}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <TableHeader column={column} title="Name" className="w-[225px]" />
    ),
    cell: ({ row }) => (
      <div className=" w-[225px]">
        <div className="text-xs font-medium truncate text-primary-600">
          {row.original.manufacturer}
        </div>
        <div className="font-semibold truncate text-primary-900">
          {row.getValue("name")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TableHeader column={column} title="Description" className="w-[175px]" />
    ),
    cell: ({ row }) => (
      <div className="text-primary-900 w-[175px] truncate text-xs font-medium">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <TableHeader column={column} title="Locator" className="w-[120px]" />
    ),
    cell: ({ row }) => (
      <div className="text-primary-900 w-[120px] truncate text-xs font-medium">
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <TableHeader column={column} title="Price" className="w-[100px]" />
    ),
    cell: ({ row }) => (
      <div className="text-primary-900 w-[100px] truncate font-medium flex items-center">
        <PesoIcon className="w-3 h-3" />
        <span className="w-full text-xs truncate">
          {formatNumber(row.getValue("price"))}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <TableHeader column={column} title="Stocks" className="w-[75px]" />
    ),
    cell: ({ row }) => (
      <div className="text-primary-900 w-[75px] truncate font-medium text-xs">
        {row.getValue("stock")}
      </div>
    ),
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <TableHeader column={column} title="Active" className="w-[75px]" />
    ),
    cell: ({ row }) => <Status row={row} className="w-[75px]" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <TableHeader column={column} title="Actions" className="w-[100px]" />
    ),
    cell: ({ row }) => <Actions row={row} className="w-[100px]" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;

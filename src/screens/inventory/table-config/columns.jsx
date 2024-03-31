import { cn } from "@/lib/utils";

import { TableHeader } from "@/components/table/components";
import Actions from "./actions";
import Status from "./status";

const columns = [
  {
    accessorKey: "_id",
    header: ({ column }) => <TableHeader column={column} title="ID" className="w-[150px]" />,
    cell: ({ row }) => <div className="max-w-[150px] text-xs font-medium text-primary-900">{row.getValue("_id")}</div>,
    enableSorting: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => <TableHeader column={column} title="Name" className="w-[250px]" />,
    cell: ({ row }) => (
      <div className=" w-[250px]">
        <div className="text-primary-600 text-xs truncate font-medium">{row.original.manufacturer}</div>
        <div className="text-primary-900 truncate font-semibold">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => <TableHeader column={column} title="Description" className="w-[350px]" />,
    cell: ({ row }) => <div className="text-primary-900 w-[350px] truncate font-medium">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <TableHeader column={column} title="Price" className="w-[75px]" />,
    cell: ({ row }) => <div className="text-primary-900 w-[75px] truncate font-medium">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <TableHeader column={column} title="Stocks" className="w-[75px]" />,
    cell: ({ row }) => <div className="text-primary-900 w-[75px] truncate font-medium">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "active",
    header: ({ column }) => <TableHeader column={column} title="Active" className="w-[75px]" />,
    cell: ({ row }) => <Status row={row} className="w-[75px]" />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: ({ column }) => <TableHeader column={column} title="Actions" className="w-[100px]" />,
    cell: ({ row }) => <Actions row={row} className="w-[100px]" />,
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;

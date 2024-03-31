import { cn } from "@/lib/utils";

import { TableHeader } from "@/components/table/components";
import Actions from "./actions";
import Status from "./status";

const columns = [
  {
    accessorKey: "_id",
    header: ({ column }) => <TableHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="max-w-[150px] text-xs font-medium text-primary-900">{row.getValue("_id")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableHeader column={column} title="Email" />,
    cell: ({ row }) => <div className="text-primary-900 w-[300px] truncate font-medium">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TableHeader column={column} title="Role" />,
    cell: ({ row }) => (
      <div
        className={cn(
          "w-[150px] truncate font-medium text-lowercase capitalize",
          row.getValue("role") ? "text-primary-900" : "text-primary-700/60"
        )}
      >
        {row.getValue("role") ?? "not set"}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => <TableHeader column={column} title="Active" />,
    cell: ({ row }) => <Status row={row} />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: ({ column }) => <TableHeader column={column} title="Actions" />,
    cell: ({ row }) => <Actions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];

export default columns;

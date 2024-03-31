import { cn } from "@/lib/utils";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect } from "react";

import { cva } from "class-variance-authority";
import Quantity from "./quantity";

import PesoIcon from "~icons/custom/peso";
import Actions from "./actions";

const itemVariants = cva("w-full", {
  variants: {
    item: {
      default: "max-w-[75px]",
      item: "max-w-[375px]",
      qty: "max-w-[135px]",
      price: "max-w-[120px]",
      action: "max-w-[65px]",
    },
  },
  defaultVariants: {
    item: "default",
  },
});

const TableBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "[&_#row]:border-b [&_#row]:border-primary-900/20 [&_#row:last-child]:border-0 flex flex-col justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

const TableRow = ({ children, className }) => {
  return (
    <div id="row" className={cn("flex items-center border-0", className)}>
      {children}
    </div>
  );
};

const TableCell = ({ children, className }) => {
  return (
    <div id="cell" className={cn("text-primary-900 bg-primary-400 font-bold px-4 py-3 text-sm w-full break-all", className)}>
      {children}
    </div>
  );
};

const Table = ({ data }) => {
  const headers = ["item", "qty", "price"];

  return (
    <div className="h-full w-full relative overflow-auto">
      <TableRow className="[&_#cell:first-child]:rounded-ss-lg [&_#cell:last-child]:rounded-se-lg uppercase sticky top-0">
        {headers
          .filter((key) => key !== "id")
          .map((item, i) => (
            <TableCell key={i} className={cn(itemVariants({ item: item }))}>
              {item}
            </TableCell>
          ))}
        <TableCell className={cn("flex justify-center", itemVariants({ item: "action" }))}>...</TableCell>
      </TableRow>

      <TableBody>
        {data.length > 0 ? (
          data
            .map(({ id, ...rest }) => rest)
            .map((row) => (
              <TableRow key={row.id} className="bg-transparent hover:bg-primary-700/10">
                {headers.map((cell, i) => (
                  <>
                    {cell === "price" && (
                      <TableCell className={cn("bg-transparent flex items-center", itemVariants({ item: cell }))}>
                        <PesoIcon className="h-4 w-4" />
                        <div className="w-full text-sm">{row.price}</div>
                      </TableCell>
                    )}

                    {cell === "qty" && (
                      <TableCell className={cn("bg-transparent", itemVariants({ item: "qty" }))}>
                        <Quantity _id={row._id} count={row.quantity} />
                      </TableCell>
                    )}

                    {cell === "item" && (
                      <TableCell key={i} className={cn("bg-transparent", itemVariants({ item: cell }))}>
                        {row.product}
                      </TableCell>
                    )}
                  </>
                ))}

                <TableCell className={cn("bg-transparent flex justify-center", itemVariants({ item: "action" }))}>
                  <Actions _id={row._id} />
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow colSpan={headers.length} className="!bg-transparent">
            <TableCell className="h-48 text-center bg-transparent font-medium flex items-center justify-center">
              No product added...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </div>
  );
};

export default Table;

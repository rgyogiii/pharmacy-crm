import moment from "moment";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { Badge } from "@/components/ui";

import PesoIcon from "~icons/custom/peso";
import BoxIcon from "~icons/custom/box";
import Actions from "./actions";
import { useOrder } from "@/hooks";

const itemVariants = cva("w-full", {
  variants: {
    item: {
      default: "max-w-[75px]",
      name: "max-w-[285px]",
      details: "max-w-[400px]",
      price: "max-w-[150px]",
      stocks: "max-w-[150px]",
      expiry: "max-w-[110px]",
      action: "max-w-[65px]",
    },
  },
  defaultVariants: {
    item: "default",
  },
});

const expiryVariants = cva("", {
  variants: {
    expiry: {
      default: "bg-gray-400 hover:bg-gray-400",
      due: "bg-red-400 hover:bg-red-400",
      standard: "bg-yellow-500 hover:bg-yellow-500",
      long: "bg-green-600 hover:bg-green-600",
    },
  },
  defaultVariants: {
    expiry: "default",
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
    <div
      id="cell"
      className={cn(
        "text-primary-900 bg-primary-400 font-bold px-4 py-3 text-sm w-full break-all",
        className
      )}
    >
      {children}
    </div>
  );
};

const Table = ({ data, disabled }) => {
  const headers = ["name", "details", "price", "stocks", "expiry"];
  const tableBody = ["name", "description", "price", "stock", "expiryDate"];

  const { orders } = useOrder();

  const handleStockRender = (_id, stock) => {
    if (orders) {
      const res = orders.find((item) => item._id === _id);
      if (res) {
        return stock - res.quantity;
      } else {
        return stock;
      }
    } else {
      return stock;
    }
  };

  return (
    <div className="relative w-full h-full overflow-auto">
      <TableRow className="[&_#cell:first-child]:rounded-ss-lg [&_#cell:last-child]:rounded-se-lg uppercase sticky top-0 z-10">
        {headers
          .filter((key) => key !== "id")
          .map((item, i) => (
            <TableCell
              key={i}
              className={cn(itemVariants({ item: item.toLowerCase() }))}
            >
              {item}
            </TableCell>
          ))}
        <TableCell
          className={cn(
            "flex justify-center",
            itemVariants({ item: "action" })
          )}
        >
          ...
        </TableCell>
      </TableRow>

      <TableBody>
        {data.length > 0 ? (
          data.map((row) => (
            <TableRow
              key={row._id}
              className={cn("bg-transparent hover:bg-primary-700/10")}
            >
              {tableBody.map((cell, i) => (
                <Fragment key={i}>
                  {cell === "expiryDate" && (
                    <TableCell
                      className={cn(
                        itemVariants({ item: "expiry" }),
                        "bg-transparent"
                      )}
                    >
                      <Badge
                        className={cn(
                          "rounded-md text-xs h-5 px-1.5 py-0 text-primary-50",
                          formatExpiry(row[cell]) !== "Expired"
                            ? Object.keys(formatExpiry(row[cell]))[0] ===
                              "month"
                              ? expiryVariants({
                                  expiry:
                                    Object.values(formatExpiry(row[cell]))[0] <=
                                    2
                                      ? "due"
                                      : Object.values(
                                          formatExpiry(row[cell])
                                        )[0] > 3
                                      ? "long"
                                      : "standard",
                                })
                              : Object.keys(formatExpiry(row[cell]))[0] ===
                                "year"
                              ? "bg-green-600 hover:bg-green-600"
                              : "bg-red-400 hover:bg-red-400"
                            : "bg-red-400 hover:bg-red-400"
                        )}
                      >
                        {formatExpiry(row[cell]) === "Expired"
                          ? formatExpiry(row[cell])
                          : `${Object.values(
                              formatExpiry(row[cell])
                            )} ${Object.keys(formatExpiry(row[cell]))}${
                              Object.values(formatExpiry(row[cell]))[0] !== 1
                                ? "s"
                                : ""
                            }`}
                      </Badge>
                    </TableCell>
                  )}

                  {cell === "name" && (
                    <TableCell
                      className={cn(
                        itemVariants({ item: "name" }),
                        "bg-transparent"
                      )}
                    >
                      <div className="w-full text-xs font-medium text-primary-600">
                        {row.manufacturer}
                      </div>
                      <div className="w-full">{row.name}</div>
                    </TableCell>
                  )}

                  {cell === "description" && (
                    <TableCell
                      className={cn(
                        itemVariants({ item: "details" }),
                        "bg-transparent"
                      )}
                    >
                      <div className="w-full">{row.description}</div>
                      {Boolean(row.isPrescriptionRequired) && (
                        <Badge className="rounded-md text-[10px] h-5 px-1.5 py-0 bg-red-400 text-primary-50 hover:bg-red-400">
                          Prescription
                        </Badge>
                      )}
                    </TableCell>
                  )}

                  {cell === "price" && (
                    <TableCell
                      className={cn(
                        itemVariants({ item: "price" }),
                        "bg-transparent flex items-center gap-x-0.5"
                      )}
                    >
                      <PesoIcon className="w-3 h-3" />
                      <div className="w-full text-sm">
                        {formatNumber(row.price)}
                      </div>
                    </TableCell>
                  )}

                  {cell === "stock" && (
                    <TableCell
                      className={cn(
                        itemVariants({ item: "stocks" }),
                        "bg-transparent flex items-center gap-x-1"
                      )}
                    >
                      <div className="text-sm">
                        {handleStockRender(row._id, row.stock)}
                      </div>
                      <BoxIcon className="w-4 h-4" />
                    </TableCell>
                  )}
                </Fragment>
              ))}

              <TableCell
                className={cn(
                  "bg-transparent flex justify-center",
                  itemVariants({ item: "action" })
                )}
              >
                <Actions
                  row={row}
                  disabled={
                    formatExpiry(row.expiryDate) === "Expired" ||
                    Object.keys(formatExpiry(row.expiryDate))[0] === "day" ||
                    (Object.keys(formatExpiry(row.expiryDate))[0] === "month" &&
                      Object.values(formatExpiry(row.expiryDate))[0] <= 2) ||
                    disabled
                  }
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow colSpan={headers.length} className="!bg-transparent">
            <TableCell className="flex items-center justify-center h-48 font-medium text-center bg-transparent">
              No products to display...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </div>
  );
};

export default Table;

const formatNumber = (num) => {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatExpiry = (targetDate) => {
  const endDate = moment(targetDate);
  const duration = moment.duration(endDate.diff(moment()));

  // Check if duration is zero or negative
  if (duration.asMilliseconds() <= 0) {
    return "Expired";
  }

  const years = Math.floor(duration.asYears());
  const months = Math.floor(duration.asMonths());
  const days = Math.floor(duration.asDays());

  let remainingTime;

  if (years > 0) {
    remainingTime = { year: years };
  } else if (months > 0) {
    remainingTime = { month: months };
  } else {
    remainingTime = { day: days };
  }
  return remainingTime;
};

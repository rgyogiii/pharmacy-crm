import { useEffect, useState } from "react";
import { Button, Select } from "@/components/ui";

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const { SelectContainer, SelectContent, SelectItem, SelectTrigger, SelectValue } = Select;

const Pagination = ({ table, noRowSelection = false, ...props }) => {
  const [showRowSelection, setShowRowSelection] = useState(!noRowSelection);
  const rowsPerPageSelection = props.rowsPerPageSelection ?? [5, 10, 25, 50, 100];

  useEffect(() => {
    if (props.rowsPerPage) {
      table.setPageSize(props.rowsPerPage);
      !noRowSelection && setShowRowSelection(rowsPerPageSelection.includes(props.rowsPerPage));
    }
  }, []);

  return (
    <div className={cn("flex items-center px-2 pt-4", showRowSelection ? "justify-between" : "justify-end")}>
      {showRowSelection && (
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <SelectContainer
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] border-stone-400 text-primary-900">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {rowsPerPageSelection.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectContainer>
        </div>
      )}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between space-x-8 w-auto">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-primary-600 shadow-xl"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-primary-600 shadow-xl"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-primary-600 shadow-xl"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 border-primary-600 shadow-xl"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;

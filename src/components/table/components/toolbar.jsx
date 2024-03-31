import { Button } from "@/components/ui";

import { TextField } from "@/components/forms";

import { TableFilter, TableOption } from "@/components/table/components";

import { Cross2Icon } from "@radix-ui/react-icons";
import SearchIcon from "~icons/custom/search";

const Toolbar = ({ table, filter }) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchField = filter["searches"].column;

  return (
    <div className="flex items-center justify-between space-y-0">
      <div className="flex flex-1 items-center space-x-2 space-y-0">
        <div className="w-1/4">
          <TextField
            placeholder={`Filter ${searchField}`}
            type="text"
            name="filter-search"
            id="filter-search"
            autoComplete="off"
            value={table.getColumn(searchField)?.getFilterValue() ?? ""}
            onChange={(event) => table.getColumn(searchField)?.setFilterValue(event.target.value)}
            textboxClassName="py-2 border-primary-600 hover:!border-secondary-500 focus:!border-primary-900"
            icon={{
              left: SearchIcon,
              className: "inset-y-[11px] h-4 w-4 left-1",
            }}
            helpers={false}
          />
        </div>

        <div className="flex items-center space-x-2 flex-1">
          {Object.keys(filter)?.map((type, index) => {
            return (
              table.getColumn(filter[type].column) &&
              filter[type]?.options && (
                <TableFilter
                  key={index}
                  column={table.getColumn(filter[type].column)}
                  title={filter[type]?.title}
                  options={filter[type]?.options}
                />
              )
            );
          })}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 pr-3 pl-3.5 bg-transparent text-primary-900 hover:bg-primary-500/40 hover:text-red-500"
            >
              Reset
              <Cross2Icon className="ml-1.5 h-4 w-4 mt-[1px]" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <TableOption table={table} />
      </div>
    </div>
  );
};

export default Toolbar;

import { Button, DropdownMenu } from "@/components/ui";

const {
  DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} = DropdownMenu;

import { MixerHorizontalIcon } from "@radix-ui/react-icons";

const Option = ({ table }) => {
  return (
    <DropdownMenuContainer>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="font-bold border-stone-500 px-2">
          <MixerHorizontalIcon className="h-4 w-4 stroke-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id === "_id" ? "ID" : column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
};

export default Option;

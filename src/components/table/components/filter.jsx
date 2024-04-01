import { cn } from "@/lib/utils";

import { Popover, Button, Badge, Command, Separator } from "@/components/ui";

import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

const Filter = ({ column, title, options }) => {
  const { PopoverContainer, PopoverContent, PopoverTrigger } = Popover;
  const { CommandContainer, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } = Command;

  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue());

  return (
    <PopoverContainer>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-dashed border-primary-600 text-primary-600 hover:border-primary-800"
        >
          <PlusCircledIcon className="mr-1.5 h-4 w-4 mt-[1px]" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="space-x-1 flex">
                {selectedValues.size > 2 ? (
                  <Badge className="rounded-md px-2 bg-primary-900/30 text-primary-900 hover:bg-primary-900/30">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-md px-2 bg-primary-900/30 text-primary-900 hover:bg-primary-900/30"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <CommandContainer>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option, i) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={i}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center border-primary-900 rounded",
                        isSelected ? "bg-secondary-500 text-primary-50" : "opacity-50 border [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center bg-stone-100/20 hover:!bg-stone-100/30"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </CommandContainer>
      </PopoverContent>
    </PopoverContainer>
  );
};

export default Filter;

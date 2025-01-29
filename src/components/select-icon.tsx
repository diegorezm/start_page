import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {IconComponent} from "@/components/icon";

import {lucideIcons} from "@/interfaces/icon";

import {useState} from "react";

export type SelectIconProps = {
  icon: string;
  onSelect: (selectedIcon: string) => void;
};

export default function SelectIcon({icon, onSelect}: SelectIconProps) {
  const iconKeys = Object.keys(lucideIcons);

  const [openPopover, setOpenPopover] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const displayedIcons = searchTerm !== "" ?
    iconKeys.filter((icon) => icon.toLowerCase().includes(searchTerm.toLowerCase())) :
    iconKeys.slice(0, 40);
  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          <span className="flex items-center space-x-2">
            <IconComponent icon={icon} />
            <span>{icon}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 shadow-lg rounded-md bg-base-100">
        <Command>
          <CommandInput placeholder="Search icon..." value={searchTerm} onValueChange={(e) => setSearchTerm(e)} />
          <CommandList>
            <CommandEmpty>No icons found</CommandEmpty>
            <CommandGroup about="Icon list">
              {displayedIcons.map((icon) => (
                <CommandItem
                  key={icon}
                  onSelect={() => {
                    onSelect(icon);
                    setOpenPopover(false);
                    setSearchTerm("");
                  }}
                >
                  <IconComponent icon={icon} />
                  <span>{icon}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

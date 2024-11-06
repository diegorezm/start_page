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

import {useSectionsStore} from "@/features/sections/sections-store";
import {useState} from "react";

export type SelectSectionProps = {
  section: string;
  onSelect: (selectedSection: string) => void;
};

export default function SelectSection({section, onSelect}: SelectSectionProps) {
  const {sections: sectionsStore} = useSectionsStore();
  const sections = Object.keys(sectionsStore);

  const [openPopover, setOpenPopover] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const displayedSection = searchTerm !== "" ?
    sections.filter((section) => section.toLowerCase().includes(searchTerm.toLowerCase())) :
    sections;

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          {sectionsStore[section].label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-md bg-base-100 p-2 shadow-lg">
        <Command>
          <CommandInput placeholder="Search icon..." value={searchTerm} onValueChange={(e) => setSearchTerm(e)} />
          <CommandList>
            <CommandEmpty>No section found</CommandEmpty>
            <CommandGroup about="Section list">
              {displayedSection.map((section) => (
                <CommandItem
                  key={section}
                  onSelect={() => {
                    onSelect(section);
                    setOpenPopover(false);
                    setSearchTerm("");
                  }}
                >
                  <span>{sectionsStore[section].label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

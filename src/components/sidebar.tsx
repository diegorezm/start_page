import {Sheet, SheetTitle, SheetHeader, SheetDescription, SheetContent} from "@/components/ui/sheet";
import {Separator} from "./ui/separator";
import {WallpaperForm} from "@/features/wallpaper/components/form";
import {ThemeSelector} from "./theme-selector";
import {Button} from "./ui/button";
import {Plus} from "lucide-react";
import {Switch} from "./ui/switch";

import {openSidebar} from "@/store/open-sidebar";
import {useEditModeStore} from "@/store/edit-mode";
import {openCreateBookmark} from "@/features/bookmarks/hooks/open-create-sheet";
import {openCreateSection} from "@/features/sections/hooks/open-create-sheet";

const SidebarSeparator = () => {
  return (
    <>
      <br />
      <Separator />
      <br />
    </>

  );
}

export const Sidebar = () => {
  const {isOpen, onClose} = openSidebar();
  const {onOpen: onOpenCreateBookmark} = openCreateBookmark();
  const {onOpen: onOpenCreateSection} = openCreateSection();


  const {isEditMode, toggleEditMode} = useEditModeStore();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configuration</SheetTitle>
          <SheetDescription>Configure your bookmarks</SheetDescription>
          <Separator />
        </SheetHeader>
        <br />
        <div>
          <h1 className="text-md font-bold mb-2">Wallpaper</h1>
          <WallpaperForm />
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="text-md font-bold mb-2">Theme</h1>
          <ThemeSelector />
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="text-md font-bold mb-2">Edit mode</h1>
          <div className="flex flex-row items-center gap-2">
            <Switch checked={isEditMode} onCheckedChange={toggleEditMode} />
            <span className="text-md">Enable edit mode</span>
          </div>
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="text-md font-bold mb-2">Add</h1>
          <div className="flex flex-row gap-2">
            <Button size="default" variant="default" className="w-full" onClick={onOpenCreateSection}>
              <Plus />
              <span>Section</span>
            </Button>

            <Button size="default" variant="outline" className="w-full" onClick={onOpenCreateBookmark}>
              <Plus />
              <span>Bookmark</span>
            </Button>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}

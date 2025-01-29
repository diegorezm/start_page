import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetContent,
} from "@/components/ui/sheet";
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
import {openExportDialog} from "@/features/external/hooks/open-export-dialog";
import {openImportDialog} from "@/features/external/hooks/open-import-sheet";

const SidebarSeparator = () => {
  return (
    <>
      <br />
      <Separator />
      <br />
    </>
  );
};

export const Sidebar = () => {
  const {isOpen, onClose} = openSidebar();
  const {onOpen: onOpenCreateBookmark} = openCreateBookmark();
  const {onOpen: onOpenCreateSection} = openCreateSection();
  const {onOpen: onOpenExportDialog} = openExportDialog();
  const {onOpen: onOpenImportDialog} = openImportDialog();

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
          <h1 className="mb-2 font-bold text-md">Wallpaper</h1>
          <WallpaperForm />
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="mb-2 font-bold text-md">Theme</h1>
          <ThemeSelector />
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="mb-2 font-bold text-md">Edit mode</h1>
          <div className="flex flex-row items-center gap-2">
            <Switch checked={isEditMode} onCheckedChange={toggleEditMode} />
            <span className="text-md">Enable edit mode</span>
          </div>
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="mb-2 font-bold text-md">Add</h1>
          <div className="flex flex-row gap-2">
            <Button
              size="default"
              variant="default"
              className="w-full"
              onClick={onOpenCreateSection}
            >
              <Plus />
              <span>Section</span>
            </Button>

            <Button
              size="default"
              variant="outline"
              className="w-full"
              onClick={onOpenCreateBookmark}
            >
              <Plus />
              <span>Bookmark</span>
            </Button>
          </div>
        </div>

        <SidebarSeparator />

        <div>
          <h1 className="mb-2 font-bold text-md">External</h1>
          <div className="flex flex-row gap-2">
            <Button
              size="default"
              variant="default"
              className="w-full"
              onClick={onOpenImportDialog}
            >
              <Plus />
              <span>Import settings</span>
            </Button>

            <Button
              size="default"
              variant="outline"
              className="w-full"
              onClick={onOpenExportDialog}
            >
              <Plus />
              <span>Export settings</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

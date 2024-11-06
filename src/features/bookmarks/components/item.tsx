import IconComponent from "@/components/icon";
import {Button} from "@/components/ui/button";
import {Bookmark} from "@/interfaces/bookmark";
import {useEditModeStore} from "@/store/edit-mode";
import {Pencil, Trash} from "lucide-react";
import {useDeleteBookmarks} from "../api/use-delete-bookmarks";
import {useToast} from "@/hooks/use-toast";
import {openUpdateBookmark} from "../hooks/open-update-sheet";

type BookmarkItemProps = {
  section: string;
  bookmark: Bookmark;
};

export const BookmarkItem = ({section, bookmark}: BookmarkItemProps) => {
  const {isEditMode} = useEditModeStore();
  const {error, mutate, status} = useDeleteBookmarks();
  const {onOpen: onOpenUpdateBookmark} = openUpdateBookmark();
  const {toast} = useToast();

  const onEditBookmark = () => {
    if (bookmark.id === undefined) {
      toast({variant: "destructive", title: "Error", description: "Something went wrong."});
      return;
    }
    onOpenUpdateBookmark(bookmark.id, section);
  }
  const onDeleteBookmark = () => {
    if (bookmark.id === undefined) {
      toast({variant: "destructive", title: "Error", description: "Something went wrong."});
      return;
    }
    mutate(section, bookmark.id);
    if (status === "error") {
      toast({variant: "destructive", title: "Error", description: error});
      return;
    }
    toast({title: "Success", description: "Bookmark deleted!"});
  }

  return (
    <div>
      <a href={bookmark.url} target="_blank" rel="noreferrer"
        className="inline-flex items-center w-full h-full gap-2 hover:bg-primary/20 rounded-md px-2 py-1 transition text-3xl 2xl:text-4xl">
        <IconComponent icon={bookmark.icon} size="md" />
        <span>{bookmark.label}</span>
      </a>
      {isEditMode && (
        <div className="flex flex-row items-center justify-center gap-2 mt-1">
          <Button size="icon" variant="secondary" onClick={onEditBookmark}>
            <Pencil />
          </Button>

          <Button size="icon" variant="outline" onClick={onDeleteBookmark} disabled={status === "loading"}>
            <Trash />
          </Button>
        </div>
      )}
    </div>
  );
};

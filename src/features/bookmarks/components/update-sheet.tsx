import {Sheet, SheetTitle, SheetHeader, SheetContent, SheetDescription} from "@/components/ui/sheet";
import {BookmarkForm} from "./form";
import {useToast} from "@/hooks/use-toast";
import {openUpdateBookmark} from "../hooks/open-update-sheet";
import {useUpdateBookmark} from "../api/use-update-bookmark";
import {useGetBookmark} from "../api/use-get-bookmark";
import {useEffect, useState} from "react";
import {Bookmark} from "@/interfaces/bookmark";

export const UpdateBookmarkSheet = () => {
  const {toast} = useToast();
  const {isOpen, onClose, bookmarkId, section} = openUpdateBookmark();

  const {mutate: updateBookmark, status: updateBookmarkStatus, error: updateBookmarkError} = useUpdateBookmark();
  const {query: fetchBookmark, status: getBookmarkStatus, error: getBookmarkError} = useGetBookmark();

  const [bookmark, setBookmark] = useState<Bookmark | null>(null);

  // TODO: make this better somehow, there is not way this
  // is the best way to do this
  useEffect(() => {
    if (isOpen) {
      if (getBookmarkStatus === "error") {
        toast({variant: "destructive", title: "Error", description: getBookmarkError});
        return;
      }
      if (bookmarkId && section) {
        const fetchedBookmark = fetchBookmark(bookmarkId, section);
        setBookmark(fetchedBookmark);
      } else {
        toast({variant: "destructive", title: "Error", description: "Something went wrong."});
      }
    }
  }, [isOpen, bookmarkId, section, fetchBookmark]);

  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Bookmark</SheetTitle>
          <SheetDescription> Update the bookmark fields</SheetDescription>
        </SheetHeader>
        {bookmark && (
          <BookmarkForm
            fields={bookmark}
            section={section!}
            onSubmit={(section, f) => {
              updateBookmark(section, bookmarkId!, f);
              if (updateBookmarkStatus === "error") {
                toast({variant: "destructive", title: "Error", description: updateBookmarkError});
                return;
              }
              toast({title: "Success", description: "Bookmark updated!"});
              onClose();
            }}
            isLoading={updateBookmarkStatus === "loading" || getBookmarkStatus === "loading"}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};


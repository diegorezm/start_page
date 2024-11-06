import {Sheet, SheetTitle, SheetHeader, SheetContent, SheetDescription} from "@/components/ui/sheet";
import {BookmarkForm} from "./form";

import {openCreateBookmark} from "../hooks/open-create-sheet"
import {useCreateBookmark} from "../api/use-create-bookmark";

import {useToast} from "@/hooks/use-toast";

export const CreateBookmarkSheet = () => {
  const {isOpen, onClose} = openCreateBookmark()
  const {mutate, status, error} = useCreateBookmark()
  const {toast} = useToast()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="mb-2">
          <SheetTitle>Create bookmark</SheetTitle>
          <SheetDescription>Create a new bookmark</SheetDescription>
        </SheetHeader>
        <BookmarkForm onSubmit={(section, f) => {
          mutate(section, f)
          if (status === "error") {
            toast({variant: "destructive", title: "Error", description: error})
            return
          }
          toast({title: "Success", description: "Bookmark created!"})
          onClose()
        }} isLoading={status === "loading"} />
      </SheetContent>
    </Sheet>
  )
}

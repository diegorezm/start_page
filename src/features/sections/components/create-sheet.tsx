import {Sheet, SheetTitle, SheetHeader, SheetContent, SheetDescription} from "@/components/ui/sheet";
import {openCreateSection} from "../hooks/open-create-sheet";
import {SectionForm} from "./form";
import {useCreateSection} from "../api/use-create-section";
import {useToast} from "@/hooks/use-toast";

export const CreateSectionSheet = () => {
  const {isOpen, onClose} = openCreateSection();
  const {error, status, mutate} = useCreateSection();
  const {toast} = useToast();

  return (
    <Sheet open={isOpen} onOpenChange={onClose} >
      <SheetContent>
        <SheetHeader className="mb-2" >
          <SheetTitle>Create section </SheetTitle>
          <SheetDescription > Create a new section </SheetDescription>
        </SheetHeader>
        <SectionForm onSubmit={(fields) => {
          mutate(fields);
          if (status === "error") {
            toast({variant: "destructive", title: "Error", description: error})
            return
          }
          toast({title: "Success", description: "Section created!"})
          onClose();

        }} />
      </SheetContent>
    </Sheet>

  )
}

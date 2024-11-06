import {Sheet, SheetTitle, SheetHeader, SheetContent, SheetDescription} from "@/components/ui/sheet";
import {SectionForm} from "./form";


import {openUpdateSection} from "../hooks/open-update-sheet";
import {useDeleteSection} from "../api/use-delete-section";
import {useUpdateSection} from "../api/use-update-section";

import {Section} from "@/interfaces/section";

import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {useSectionsStore} from "../sections-store";


export const UpdateSectionSheet = () => {
  const {toast} = useToast();
  const {sections} = useSectionsStore();
  const {isOpen, onClose, section: sectionId} = openUpdateSection();
  const {error: updateSectionError, mutate: updateSection, status: updateSectionStatus} = useUpdateSection();
  const {error: deleteSectionError, mutate: deleteSection, status: deleteSectionStatus} = useDeleteSection();
  const [section, setSection] = useState<Section | null>(null);

  useEffect(() => {
    if (isOpen && sectionId) {
      const fetchedSection = sections[sectionId];
      setSection(fetchedSection);
    }
  }, [isOpen, sectionId])


  if (!isOpen) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose} >
      <SheetContent>
        <SheetHeader className="mb-2" >
          <SheetTitle>Update section</SheetTitle>
          < SheetDescription > Update the section name and icon</ SheetDescription>
        </SheetHeader>
        <SectionForm fields={section!} onSubmit={(f) => {
          updateSection(sectionId!, f);
          if (updateSectionStatus === "error") {
            toast({variant: "destructive", title: "Error", description: updateSectionError});
            return;
          }
          toast({title: "Success", description: "Section updated!"});
          onClose();
        }}
          onDelete={() => {
            deleteSection(sectionId!);
            if (deleteSectionStatus === "error") {
              toast({variant: "destructive", title: "Error", description: deleteSectionError});
              return;
            }
            toast({title: "Success", description: "Section deleted!"});
            onClose();
          }}
          isLoading={updateSectionStatus === "loading" || deleteSectionStatus === "loading"} />
      </SheetContent>
    </Sheet>

  )
}


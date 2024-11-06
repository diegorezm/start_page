import {type SectionRecord} from "@/interfaces/section";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import defaultSections from "@/features/sections/default-sections";


export interface SectionsStore {
  sections: SectionRecord
  setSections: (sections: SectionRecord) => void
}


export const useSectionsStore = create<SectionsStore>()(
  persist(
    (set) => ({
      sections: defaultSections,
      setSections: (sections) => set(() => ({sections})),
    }),
    {
      name: "sections-store",
    }
  )
);

import type Section from "$lib/interfaces/section";
import sections from "$lib/context/section-context";
import handleStorage from "$lib/utils/handle-storage";
import { get } from "svelte/store";

export default function useSections() {
  const sectionValues = get(sections);

  const { loadFromStorage } = handleStorage();

  const loadSections = (data?: Section[]) => {
    const sec = loadFromStorage();
    if (sec) {
      sections.set(sec);
      return sec;
    } else if (data) {
      return createSections(data);
    }
    return sectionValues;
  };

  const createSections = (section: Section[]) => {
    section.forEach((e) => {
      if (!(e.title in sectionValues)) {
        sectionValues[e.title] = e;
      }
      sections.set(sectionValues);
    });
    return sectionValues;
  };
  
  const createSection = (section: Section) => {
    if (!(section.title in sectionValues)) {
      sectionValues[section.title] = section;
      sections.set(sectionValues);
    }
    return sectionValues;
  };

  const deleteSection = (section: string) => {
    if (section in sectionValues) {
      delete sectionValues[section];
      sections.set(sectionValues);
    }
    return sectionValues;
  };

  const getSectionKeys = () => {
    return Object.keys(get(sections)) as string[];
  };
  
  return {
    loadSections,
    createSection,
    createSections,
    deleteSection,
    getSectionKeys
  };
}

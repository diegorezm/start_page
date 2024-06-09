import type Section from "$lib/interfaces/section";
import sections from "$lib/context/section-context";
import handleStorage from "$lib/utils/handle-storage";
import { get } from "svelte/store";

export default function useSections() {
  const { loadFromStorage, saveToStorage } = handleStorage();
  const loadSections = (data?: Section[]) => {
    const sectionValues = get(sections);
    const sec = loadFromStorage();
    if (sec) {
      sections.set(sec);
      return sec;
    } else if (data) {
      return createSections(data);
    }
    saveToStorage();
    return sectionValues;
  };

  const createSections = (section: Section[]) => {
    const sectionValues = get(sections);
    section.forEach((e) => {
      if (!(e.title in sectionValues)) {
        sectionValues[e.title] = e;
      }
      sections.set(sectionValues);
    });
    saveToStorage();
    return sectionValues;
  };

  const createSection = (section: Section) => {
    const sectionValues = get(sections);
    if (!(section.title in sectionValues)) {
      sectionValues[section.title] = section;
      sections.set(sectionValues);
    }
    saveToStorage();
    return sectionValues;
  };

  const deleteSection = (section: string) => {
    const sectionValues = get(sections);
    if (section in sectionValues) {
      delete sectionValues[section];
      sections.set(sectionValues);
    }
    saveToStorage();
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
    getSectionKeys,
  };
}

import defaultSections from "../content/default-sections";
import sections from "../context/section-context";
import sectionStorageHelper from "../helpers/section-storage-helper";
import Section, { SectionRecord } from "../interfaces/section";

const useSections = () => {
  const { loadFromStorage, saveToStorage } = sectionStorageHelper();
  const loadSections = () => {
    const sec = loadFromStorage();
    if (sec) {
      sections.value = sec;
    } else {
      const sec: SectionRecord = {};
      defaultSections.map((e) => {
        sec[e.label] = e;
      });
      sections.value = sec;
    }
  };

  const createSections = (section: Section[]) => {
    section.map((e) => {
      createSection(e);
    });
    saveToStorage();
    return sections.value;
  };

  const createSection = (section: Section) => {
    const sectionValues = sections.value;
    if (!(section.label in sectionValues)) {
      sectionValues[section.label] = section;
      sections.value = sectionValues;
    }
    saveToStorage();
    return sectionValues;
  };

  const deleteSection = (section: string) => {
    const sectionValues = sections.value;
    if (section in sectionValues) {
      delete sectionValues[section];
      sections.value = sectionValues;
    }
    saveToStorage();
    return sectionValues;
  };

  const getSectionKeys = () => {
    return Object.keys(sections.value) as string[];
  };

  return {
    loadSections,
    createSection,
    createSections,
    deleteSection,
    getSectionKeys,
  };
};
export default useSections;

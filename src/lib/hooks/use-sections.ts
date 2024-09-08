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
        sec[e.id] = e;
      });
      sections.value = sec;
      saveToStorage();
    }
  };

  const getSectionById = (id: string) => {
    const sectionValues = sections.value;
    if (id in sectionValues) {
      return sectionValues[id];
    }
    return null;
  };

  const getSectionKeys = () => {
    return Object.keys(sections.value) as string[];
  };

  const getAllSections = () => {
    const keys = getSectionKeys();
    const allSections = keys
      .map((id) => getSectionById(id))
      .filter((section) => section !== null);
    return allSections;
  };

  const createSections = (section: Section[]) => {
    section.forEach((e) => {
      createSection(e);
    });
    saveToStorage();
  };

  const createSection = (section: Section) => {
    const sectionValues = sections.value;
    if (!(section.label in sectionValues)) {
      sectionValues[section.id] = section;
      sections.value = sectionValues;
    }
    saveToStorage();
  };

  const updateSection = (section: Section) => {
    const sectionValues = { ...sections.value };
    const toUpdate = sectionValues[section.id];
    toUpdate.label = section.label;
    toUpdate.icon = section.icon;
    sections.value = sectionValues;
    saveToStorage();
  };

  const deleteSection = (section: string) => {
    const sectionValues = { ...sections.value };
    if (section in sectionValues) {
      delete sectionValues[section];
      sections.value = sectionValues;
    }
    saveToStorage();
  };

  return {
    loadSections,
    getSectionById,
    getSectionKeys,
    getAllSections,
    createSection,
    updateSection,
    createSections,
    deleteSection,
  };
};
export default useSections;

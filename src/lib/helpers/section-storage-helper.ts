import sections from "../context/section-context";
import { type SectionRecord } from "../interfaces/section";

const STORAGE_KEY = "sections";

const sectionStorageHelper = () => {
  const saveToStorage = (data?: SectionRecord) => {
    if (data) {
      sections.value = data;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections.value));
  };

  const loadFromStorage = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const secs: SectionRecord = JSON.parse(data);
        sections.value = secs;
        return secs;
      }
      throw new Error();
    } catch (error) {
      return null;
    }
  };
  return {
    saveToStorage,
    loadFromStorage,
  };
};

export default sectionStorageHelper;

import { get } from "svelte/store";
import type Section from "$lib/interfaces/section";
import  sections  from "$lib/context/section-context";
import { browser } from "$app/environment";

export default function handleStorage() {
  const sectionValues = get(sections);
  const storageKey = "sections";

  const saveToStorage = (data?: Record<string, Section>) => {
    if (browser) {
      if (data) {
        localStorage.setItem(storageKey, JSON.stringify(data));
        sections.set(data);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(sectionValues));
      }
    }
  };

  const loadFromStorage = () => {
    if (browser) {
      const data = localStorage.getItem(storageKey);
      if (data) {
        const secs: Record<string, Section> = JSON.parse(data);
        sections.set(secs);
        return secs;
      }
    }
    return null;
  };
  return {
    saveToStorage,
    loadFromStorage,
  };
}

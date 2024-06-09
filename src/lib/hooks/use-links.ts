import type Link from "$lib/interfaces/link";
import sections from "$lib/context/section-context";
import { get } from "svelte/store";
import handleStorage from "$lib/utils/handle-storage";

export default function useLinks() {
  const { saveToStorage} = handleStorage();
  const createLinks = (section: string, link: Link[]) => {
    const sectionsValue = get(sections);
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      sec.links = [...sec.links, ...link];
      sections.set(sectionsValue);
      saveToStorage();
    }
  };
  const createLink = (section: string, link: Link) => {
    const sectionsValue = get(sections);
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      sec.links = [...sec.links, link];
      sections.set(sectionsValue);
      saveToStorage();
    }
  };
  const updateLink = (section: string, linkId: number, link: Link) => {
    const sectionsValue = get(sections);
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      const linkIndex = sec.links.findIndex((e) => e.id === linkId);
      if (linkIndex >= 0) {
        sec.links[linkIndex] = link;
        sections.set(sectionsValue);
        saveToStorage();
      }
    }
  };
  const deleteLink = (section: string, linkId: number) => {
    const sectionsValue = get(sections);
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      sec.links = sec.links.filter((e) => e.id !== linkId);
      sections.set(sectionsValue);
      saveToStorage();
    }
  };
  return {
    createLinks,
    createLink,
    updateLink,
    deleteLink,
  };
}

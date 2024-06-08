import type Link from "$lib/interfaces/link";
import sections from "$lib/context/section-context";
import { get } from "svelte/store";

export default function useLinks() {
  const sectionsValue = get(sections);
  const createLinks = (section: string, link: Link[]) => {
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      sec.links = [...sec.links, ...link];
    }
    sections.set(sectionsValue);
  };
  const createLink = (section: string, link: Link) => {
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      sec.links = [...sec.links, link];
    }
    sections.set(sectionsValue);
  };
  const updateLink = (section: string, linkId: number, link: Link) => {
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      const linkIndex = sec.links.findIndex((e) => e.id === linkId);
      if (linkIndex >= 0) {
        sec.links[linkIndex] = link;
        sections.set(sectionsValue);
      }
    }
  };
  const deleteLink = (section: string, linkId: number) => {
    if (section in sectionsValue) {
      const sec = sectionsValue[section];
      sec.links = sec.links.filter((e) => e.id !== linkId);
      sections.set(sectionsValue);
    }
  };
  return {
    createLinks,
    createLink,
    updateLink,
    deleteLink,
  };
}

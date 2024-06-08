/* eslint-disable semi */
import type Link from "./link";

export default interface Section {
  icon: string;
  title: string;
  links: Link[];
}

export type SectionRecord = Record<string, Section>;
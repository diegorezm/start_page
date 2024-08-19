import Section from "../interfaces/section";
import { com, mydia } from "./default-bookmarks";

const defaultSections: Section[] = [
  {
    label: "Com",
    icon: "ion:chatbubbles-outline",
    bookmarks: com,
  },
  {
    label: "Mydia",
    icon: "ion:images-outline",
    bookmarks: mydia,
  },
];

export default defaultSections;

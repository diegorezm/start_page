import uniqueID from "../helpers/unique-id-helper";
import Section from "../interfaces/section";
import { com, mydia } from "./default-bookmarks";

const defaultSections: Section[] = [
  {
    id: uniqueID().toString(),
    label: "Com",
    icon: "ion:chatbubbles-outline",
    bookmarks: com,
  },
  {
    id: uniqueID().toString(),
    label: "Mydia",
    icon: "ion:images-outline",
    bookmarks: mydia,
  },
];

export default defaultSections;

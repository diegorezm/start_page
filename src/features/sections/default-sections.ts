import {SectionRecord} from "@/interfaces/section";
import {com, mydia} from "../bookmarks/default-bookmarks";

const defaultSections: SectionRecord = {
  '851353236435': {
    id: '851353236435',
    label: "Com",
    icon: "MessageSquareText",
    bookmarks: com,
  },
  '851353236436': {
    id: '851353236436',
    label: "Mydia",
    icon: "TvMinimal",
    bookmarks: mydia,
  },
};

export default defaultSections;

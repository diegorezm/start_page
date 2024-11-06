import IconComponent from "@/components/icon";
import {Button} from "@/components/ui/button";
import {BookmarkItem} from "@/features/bookmarks/components/item";
import {Section} from "@/interfaces/section";
import {useEditModeStore} from "@/store/edit-mode";
import {Pencil} from "lucide-react";
import {openUpdateSection} from "../hooks/open-update-sheet";

type SectionCardProps = {
  section: Section;
};

export const SectionCard = ({section}: SectionCardProps) => {
  const {isEditMode} = useEditModeStore();
  const {onOpen} = openUpdateSection();

  const handleOnEdit = () => {
    if (!section.id) return;
    onOpen(section.id);
  };

  return (
    <div className="space-y-2 md:space-y-4 max-w-screen-2xl px-2 py-1 transition">
      <nav
        className="flex flex-row justify-center items-center gap-2"
      >

        <div className="flex flex-row items-center justify-center gap-1 2xl:gap-3 text-4xl 2xl:text-5xl font-bold text-primary">
          <IconComponent icon={section.icon} size="md" />
          <h1 className="text-4xl 2xl:text-5xl">{section.label}</h1>
        </div>

        {isEditMode && (
          <Button size="icon" variant="secondary" onClick={handleOnEdit}>
            <Pencil />
          </Button>
        )}
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-1">
        {section.bookmarks.map((bookmark, i) => (
          <BookmarkItem section={section.id!} bookmark={bookmark} key={i + 1} />
        ))}
      </div>
    </div>
  );
};

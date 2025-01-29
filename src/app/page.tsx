"use client";

import {ClockComponent} from "@/components/clock";
import {Container} from "@/components/container";
import {IconComponent} from "@/components/icon";
import {MiddleIconContainer} from "@/components/middle-icon-container";
import {SectionCard} from "@/features/sections/components/card";

import {useSectionsStore} from "@/features/sections/sections-store";
import {openSidebar} from "@/store/open-sidebar";

export default function Home() {
  const {sections} = useSectionsStore();
  const {onOpen} = openSidebar();

  return (
    <Container>
      <nav className="inline-flex items-center justify-between w-full p-2">
        <div></div>
        <ClockComponent />
        <div>
          <button onClick={onOpen}>
            <IconComponent icon="Settings" size="sm" className="transition-all hover:rotate-180 hover:cursor-pointer" />
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center w-full overflow-y-scroll">
        <MiddleIconContainer />

        <div className="w-2/3 p-6 border rounded-lg md:w-fit md:p-2 border-primary space-y-2 2xl:space-y-4 bg-card">
          {Object.keys(sections).map((section) => (
            <SectionCard key={sections[section].id} section={sections[section]} />
          ))}
        </div>
      </div>
      <div></div>
    </Container>
  );
}

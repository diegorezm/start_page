"use client";

import { Sidebar } from "@/components/sidebar";
import { CreateBookmarkSheet } from "@/features/bookmarks/components/create-sheet";
import { UpdateBookmarkSheet } from "@/features/bookmarks/components/update-sheet";
import { ExportSettingsDialog } from "@/features/external/components/export-settings-dialog";
import { ImportSettingsDialog } from "@/features/external/components/import-settings-dialog";
import { CreateSectionSheet } from "@/features/sections/components/create-sheet";
import { UpdateSectionSheet } from "@/features/sections/components/update-sheet";

export const SheetProvider = () => {
  return (
    <>
      <Sidebar />
      <CreateBookmarkSheet />
      <UpdateBookmarkSheet />
      <CreateSectionSheet />
      <UpdateSectionSheet />
      <ExportSettingsDialog />
      <ImportSettingsDialog />
    </>
  );
};

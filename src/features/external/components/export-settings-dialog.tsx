"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {openExportDialog} from "../hooks/open-export-dialog";
import {useGetConfig} from "../hooks/use-get-config";
import {Button} from "@/components/ui/button";
import {ClipboardCopy} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useMemo} from "react";
import {Textarea} from "@/components/ui/textarea";

export function ExportSettingsDialog() {
  const {isOpen, onClose} = openExportDialog();
  const {config} = useGetConfig()
  const {toast} = useToast();
  const json = useMemo(() => {
    return JSON.stringify(config, null, 2)
  }, [config])

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(json)
      toast({
        title: "Success!",
        description: "Your config is now on your clipboard!"
      })
      onClose()
    } catch (e: unknown) {
      console.error(e)
      toast({
        title: "Error!",
        description: "Something went wrong while trying to access your clipboard!",
        variant: "destructive"
      })

    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>
            Export your settings! Click the copy button and save the settings in a .json file
          </DialogDescription>
        </DialogHeader>
        <div className="relative p-2 overflow-y-auto bg-secondary rounded-md">
          <div className="absolute top-2 right-2">
            <Button variant="outline" onClick={onClick}>
              <ClipboardCopy className="size-4" />
            </Button>
          </div>
          <Textarea className="bg-secondary min-h-80" placeholder="Your json..." value={json} readOnly />
        </div>
      </DialogContent>
    </Dialog>
  );
}

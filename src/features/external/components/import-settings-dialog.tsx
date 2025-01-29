"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {openImportDialog} from "../hooks/open-import-sheet";
import {Textarea} from "@/components/ui/textarea";
import {FormEvent, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {useSetConfig} from "../hooks/use-set-config";
import {isValidConfig} from "../types";

export function ImportSettingsDialog() {
  const {isOpen, onClose} = openImportDialog();
  const [json, setJson] = useState("")
  const {setConfig} = useSetConfig()

  const {toast} = useToast()
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      const parsedJson = JSON.parse(json)
      if (isValidConfig(parsedJson)) {
        setConfig(parsedJson)
        toast({
          title: "Success!",
          description: "Your configs have been applied!"
        })
        onClose()
      } else {
        throw new Error("Invalid json object.")
      }

    } catch (e: unknown) {
      console.error(e)
      toast({
        title: "Something went wrong!",
        description: "There was a problem parsing the data you sent, are you sure its correct?",
        variant: "destructive"
      })
      setJson("");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            Import your settings!
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Textarea className="bg-secondary min-h-80" placeholder="Your json..." value={json} onChange={(e) => setJson(e.target.value)} />
          <Button>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

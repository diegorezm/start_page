import {useState} from "react"
import {useSectionsStore} from "../sections-store"
import {Section} from "@/interfaces/section"
import uniqueId from "@/lib/unique-id"

export const useCreateSection = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const {sections, setSections} = useSectionsStore()

  const mutate = (section: Section) => {
    if (!(section.label in sections)) {
      section.id = uniqueId()
      setStatus("loading")
      sections[section.id] = section
      setSections(sections)
      setError(null)
      setStatus("success")
    } else {
      setStatus("error")
      setError("Section already exists")
    }
  }

  return {mutate, status, error}
}

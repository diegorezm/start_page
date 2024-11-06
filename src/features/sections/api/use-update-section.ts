import {useState} from "react"
import {useSectionsStore} from "../sections-store"
import {Section} from "@/interfaces/section"

export const useUpdateSection = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const {sections, setSections} = useSectionsStore()
  const mutate = (sectionId: string, sectionData: Section) => {
    setStatus("loading")
    const sec = sections[sectionId]
    if (sec) {
      sections[sectionId] = sectionData
      setSections(sections)
      setError(null)
      setStatus("success")
    } else {
      setStatus("error")
      setError("Section not found")
    }
  }
  return {mutate, status, error}
}

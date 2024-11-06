import {useState} from "react"
import {useSectionsStore} from "../sections-store"

export const useDeleteSection = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const {sections, setSections} = useSectionsStore()

  const mutate = (section: string) => {
    setStatus("loading")
    const sec = sections[section]
    if (sec) {
      delete sections[section]
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

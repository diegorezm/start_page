import {useState} from "react"
import {useSectionsStore} from "../sections-store"

export const useGetSection = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const {sections} = useSectionsStore()
  const query = (section: string) => {
    if (section in sections) {
      setStatus("success")
      setError(null)
      return sections[section]
    } else {
      setStatus("error")
      setError("Section not found")
      return null
    }
  }
  return {query, status, error}
}

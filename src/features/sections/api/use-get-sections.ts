import {useState} from "react"
import {useSectionsStore} from "../sections-store"

export const useGetSections = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const {sections} = useSectionsStore()

  const query = () => {
    const keys = Object.keys(sections)
    if (keys.length > 0) {
      setStatus("success")
      setError(null)
      const sectionsArray = keys.map(key => sections[key])
      return sectionsArray
    } else {
      setStatus("error")
      setError("No sections found")
      return []
    }
  }

  return {query, status, error}
}

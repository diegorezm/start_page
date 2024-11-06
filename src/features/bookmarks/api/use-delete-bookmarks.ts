import {useSectionsStore} from "@/features/sections/sections-store"
import {useState} from "react"

export const useDeleteBookmarks = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const {sections, setSections} = useSectionsStore()
  const mutate = (section: string, bookmarkId: string) => {
    setStatus("loading")
    const sec = sections[section]
    if (sec) {
      sec.bookmarks = sec.bookmarks.filter(b => b.id !== bookmarkId)
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


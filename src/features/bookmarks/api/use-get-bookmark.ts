import {useSectionsStore} from "@/features/sections/sections-store"
import {useState} from "react"

export const useGetBookmark = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const {sections} = useSectionsStore()

  const query = (id: string, section: string) => {
    setStatus("loading")
    console.log(section)
    const bookmarks = sections[section].bookmarks
    const bookmark = bookmarks.find((b) => b.id === id)
    if (bookmark) {
      setStatus("success")
      setError(null)
      return bookmark
    } else {
      setStatus("error")
      setError("Bookmark not found")
      return null
    }
  }
  return {
    query,
    status,
    error,
  }
}

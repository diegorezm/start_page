import {useSectionsStore} from "@/features/sections/sections-store"
import {Bookmark} from "@/interfaces/bookmark"
import {useState} from "react"

export const useUpdateBookmark = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const {sections, setSections} = useSectionsStore()

  const mutate = (section: string, bookmarkId: string, bookmark: Bookmark) => {
    setStatus("loading")

    const sec = sections[section]
    if (sec) {
      const index = sec.bookmarks.findIndex(b => b.id === bookmarkId)
      if (index !== -1) {
        const newBookmark = {
          ...bookmark,
          id: bookmarkId,
        }
        sec.bookmarks[index] = newBookmark
        setSections(sections)
        setStatus("success")
        setError(null)
      } else {
        setStatus("error")
        setError("Bookmark not found")
      }
    } else {
      setStatus("error")
      setError("Section not found")
    }
  }

  return {mutate, status, error}
}


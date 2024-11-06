import {Bookmark} from "@/interfaces/bookmark"
import {useSectionsStore} from "@/features/sections/sections-store"
import {useState} from "react"

export const useCreateBookmarks = () => {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const {sections, setSections} = useSectionsStore()
  const mutate = (section: string, bookmarks: Bookmark[]) => {
    setStatus("loading")
    const sec = sections[section]
    if (sec) {
      sec.bookmarks = [...sec.bookmarks, ...bookmarks]
      setSections(sections)
      setStatus("success")
    } else {
      setStatus("error")
      setError("Section not found")
    }
  }
  return {mutate, status, error}
}

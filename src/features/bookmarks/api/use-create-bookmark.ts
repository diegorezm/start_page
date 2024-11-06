import {Bookmark} from "@/interfaces/bookmark"
import {useSectionsStore} from "@/features/sections/sections-store"
import {useState} from "react"
import uniqueId from "@/lib/unique-id"

export const useCreateBookmark = () => {
  const [status, setStatus] = useState<Status>("idle")

  const [error, setError] = useState<string | null>(null)

  const {sections, setSections} = useSectionsStore()
  const mutate = (section: string, bookmark: Bookmark) => {
    bookmark.id = uniqueId()
    setStatus("loading")
    const sec = sections[section]
    if (sec) {
      sec.bookmarks.push(bookmark)
      setError(null)
      setStatus("success")
      setSections(sections)
    } else {
      setStatus("error")
      setError("Section not found")
    }
  }
  return {mutate, status, error}
}

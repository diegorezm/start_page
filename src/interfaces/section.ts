import {bookmarkSchema} from "./bookmark"
import {z} from "zod"
import {lucideIcons} from "./icon"

export const sectionSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  icon: z.string().refine((icon) => icon in lucideIcons, {
    message: 'Invalid icon',
  }),
  bookmarks: z.array(bookmarkSchema.omit({section: true})),
})

export type Section = z.infer<typeof sectionSchema>

export type SectionRecord = Record<string, Section>

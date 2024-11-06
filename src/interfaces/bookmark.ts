import {z} from 'zod';
import {lucideIcons} from "./icon";

export const bookmarkSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  url: z.string().url(),
  icon: z.string().refine((v) => v in lucideIcons, {
    message: 'Invalid icon',
  }),
  section: z.string(),
});

export type Bookmark = Omit<z.infer<typeof bookmarkSchema>, 'section'>;

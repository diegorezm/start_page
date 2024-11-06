import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {useWallpaperStore} from "../wallpaper-store"

const wallpaperSchema = z.object({
  url: z.string().url(),
})

export const WallpaperForm = () => {

  const {setWallpaper, removeWallpaper} = useWallpaperStore();

  const form = useForm<z.infer<typeof wallpaperSchema>>({
    resolver: zodResolver(wallpaperSchema),
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (data: z.infer<typeof wallpaperSchema>) => {
    setWallpaper(data.url);
    form.reset();
  }

  const onRemove = () => {
    removeWallpaper();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField control={form.control} name="url" render={({field}) => (
          <FormItem>
            <FormControl>
              <Input {...field} type="text" placeholder="Wallpaper" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex flex-row justify-start gap-4">
          <Button type="submit" size="default">Save</Button>
          <Button type="button" variant="destructive" size="default" onClick={onRemove}>Remove</Button>
        </div>
      </form>
    </Form>
  )
}

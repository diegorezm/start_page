import type { Bookmarks, Links} from "$lib/interfaces";
import { Tag } from "$lib/interfaces";

const mydia: Links[] = [
  {
    id: 1,
    title: "AniWave",
    tag: Tag.mydia,
    icon: "nf-fa-tv",
    link: "https://aniwave.to/home"
  },
  {
    id: 2,
    title: "Youtube",
    tag: Tag.mydia,
    icon: "nf-md-youtube",
    link: "https://www.youtube.com/"
  },
  {
    id: 3,
    title: "Twitch",
    tag: Tag.mydia,
    icon: "nf-md-twitch",
    link: "https://www.twitch.tv/"
  }
];

const com: Links[] = [
  {
    id: 4,
    title: "Chatgpt",
    tag: Tag.com,
    icon: "nf-md-chat",
    link: "https://chat.openai.com/"
  },
  {
    id: 5,
    title: "Whatsapp",
    tag: Tag.com,
    icon: "nf-fa-whatsapp",
    link: "https://web.whatsapp.com/"
  },
  {
    id: 6,
    title: "Github",
    tag: Tag.com,
    icon: "nf-fa-github",
    link: "https://github.com/"
  },
];

const bookmarks: Bookmarks  = {
  mydia,
  com
}

export function load() {
  return bookmarks
}


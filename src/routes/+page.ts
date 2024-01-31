import type { Bookmarks, Links} from "$lib/interfaces";
import { Tag } from "$lib/interfaces";
import { uniqueID } from "$lib/utils";

const mydia: Links[] = [
  {
    id: uniqueID(),
    title: "AniWave",
    tag: Tag.mydia,
    icon: "nf-fa-tv",
    link: "https://aniwave.to/home"
  },
  {
    id: uniqueID(),
    title: "Youtube",
    tag: Tag.mydia,
    icon: "nf-md-youtube",
    link: "https://www.youtube.com/"
  },
  {
    id: uniqueID(),
    title: "Twitch",
    tag: Tag.mydia,
    icon: "nf-md-twitch",
    link: "https://www.twitch.tv/"
  }
];

const com: Links[] = [
  {
    id: uniqueID(),
    title: "Chatgpt",
    tag: Tag.com,
    icon: "nf-md-chat",
    link: "https://chat.openai.com/"
  },
  {
    id: uniqueID(),
    title: "Whatsapp",
    tag: Tag.com,
    icon: "nf-fa-whatsapp",
    link: "https://web.whatsapp.com/"
  },
  {
    id: uniqueID(),
    title: "Github",
    tag: Tag.com,
    icon: "nf-fa-github",
    link: "https://github.com/"
  },
];

const bookmarks: Bookmarks  = {
  mydia,
  com
};

export function load() {
  return bookmarks;
}


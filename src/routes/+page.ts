import type Link from "$lib/interfaces/link";
import type Section from "$lib/interfaces/section";
import uniqueID from "$lib/utils/unique-id";

const mydia: Link[] = [
  {
    id: uniqueID(),
    title: "AniWave",
    icon: "nf-fa-tv",
    link: "https://aniwave.to/home",
  },
  {
    id: uniqueID(),
    title: "Youtube",
    icon: "nf-md-youtube",
    link: "https://www.youtube.com/",
  },
  {
    id: uniqueID(),
    title: "Twitch",
    icon: "nf-md-twitch",
    link: "https://www.twitch.tv/",
  },
];

const com: Link[] = [
  {
    id: uniqueID(),
    title: "Chatgpt",
    icon: "nf-md-chat",
    link: "https://chat.openai.com/",
  },
  {
    id: uniqueID(),
    title: "Whatsapp",
    icon: "nf-fa-whatsapp",
    link: "https://web.whatsapp.com/",
  },
  {
    id: uniqueID(),
    title: "Github",
    icon: "nf-fa-github",
    link: "https://github.com/",
  },
];
export type Bookmarks = {
  sections: Section[]
}
const bookmarks:Bookmarks = {sections: [
  {
    title: "Com",
    icon: "nf-fa-comments_o",
    links: com,
  },
  {
    title: "Mydia",
    icon: "nf-cod-file_media",
    links: mydia,
  },
]};

export function load() {
  return bookmarks;
}
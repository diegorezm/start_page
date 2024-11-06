import {Bookmark} from "@/interfaces/bookmark";
import uniqueID from "@/lib/unique-id";

const mydia: Bookmark[] = [
  {
    id: uniqueID(),
    label: "Crunchyroll",
    icon: "Clapperboard",
    url: "https://www.crunchyroll.com/pt-br/",
  },
  {
    id: uniqueID(),
    label: "Youtube",
    icon: "Youtube",
    url: "https://www.youtube.com/",
  },
  {
    id: uniqueID(),
    label: "Twitch",
    icon: "Twitch",
    url: "https://www.twitch.tv/",
  },
];

const com: Bookmark[] = [
  {
    id: uniqueID(),
    label: "Chatgpt",
    icon: "MessageSquare",
    url: "https://chat.openai.com/",
  },
  {
    id: uniqueID(),
    label: "Whatsapp",
    icon: "MessageCircle",
    url: "https://web.whatsapp.com/",
  },
  {
    id: uniqueID(),
    label: "Github",
    icon: "Github",
    url: "https://github.com/",
  },
];

export {mydia, com};

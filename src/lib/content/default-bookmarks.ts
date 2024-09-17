import uniqueID from "../helpers/unique-id-helper";
import Bookmark from "../interfaces/bookmark";

const mydia: Bookmark[] = [
  {
    id: uniqueID(),
    label: "Crunchyroll",
    icon: "ion:tv-outline",
    url: "https://www.crunchyroll.com/pt-br/",
  },
  {
    id: uniqueID(),
    label: "Youtube",
    icon: "ion:logo-youtube",
    url: "https://www.youtube.com/",
  },
  {
    id: uniqueID(),
    label: "Twitch",
    icon: "ion:logo-twitch",
    url: "https://www.twitch.tv/",
  },
];

const com: Bookmark[] = [
  {
    id: uniqueID(),
    label: "Chatgpt",
    icon: "ion:chatbox-ellipses",
    url: "https://chat.openai.com/",
  },
  {
    id: uniqueID(),
    label: "Whatsapp",
    icon: "ion:logo-whatsapp",
    url: "https://web.whatsapp.com/",
  },
  {
    id: uniqueID(),
    label: "Github",
    icon: "ion:logo-github",
    url: "https://github.com/",
  },
];

export { mydia, com };

import "./style.css";
import App from "./App.vue";
import { ViteSSG } from "vite-ssg/single-page";
import { createPinia } from "pinia";

export const createApp = ViteSSG(App, ({ app }) => {
  const pinia = createPinia();
  app.use(pinia);
});

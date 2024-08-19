import { ViteSSG } from "vite-ssg/single-page";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

// createApp(App).mount("#app");
export const createApp = ViteSSG(App, ({ app }) => {
  const pinia = createPinia();
  app.use(pinia);
});

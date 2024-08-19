import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";

// createApp(App).mount("#app");
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");

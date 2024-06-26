import { createApp } from "vue";
import App from "./App.vue";
import "./functions/functions"
import "./commands"
Office.onReady(() => {
  createApp(App).mount("#app");
});

import { createApp } from "vue";
import App from "./App.vue";
import "./functions/functions"
import "./commands"
const app = createApp(App);
Office.onReady(() => {
  app.mount("#app");
});

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./functions"
Office.onReady(() => {
  createApp(App).mount("#app");
});

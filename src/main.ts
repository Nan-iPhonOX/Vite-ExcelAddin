import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./officeLib"
import "./functions/functions"
import "./commands"
const app = createApp(App);
app.use(router) // 必须在挂载前
Office.onReady(() => {
  app.mount("#app");
});

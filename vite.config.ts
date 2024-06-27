import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path"
import { excelAddin } from "./src/compiler";
// https://vitejs.dev/config/
export default defineConfig({
  // resolve:{
  //   alias:{
  //     '@':resolve(__dirname, 'src'),
  //   }
  // },
  plugins: [vue(), excelAddin()],
  server: {
    port: 3000,
  },
});

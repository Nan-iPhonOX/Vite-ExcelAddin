import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import excelAddin from "./src/compiler";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), excelAddin()],
  server: {
    port: 3000,
  },
});

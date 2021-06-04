import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tsconfig from "vite-tsconfig-paths"

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    vue(),
    tsconfig({
      extensions: [".vue"],
      loose: true,
    }),
  ],
})

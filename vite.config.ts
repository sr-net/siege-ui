import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import tsconfig from "vite-tsconfig-paths"

// https://vitejs.dev/config
export default defineConfig({
  server: { port: 3001 },

  plugins: [
    vue(),
    tsconfig({
      loose: true,
    }),
  ],
})

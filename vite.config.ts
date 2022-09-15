import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tsconfig from "vite-tsconfig-paths"
import { esbuildPluginBrowserslist } from "esbuild-plugin-browserslist"
import browserslist from "browserslist"

// https://vitejs.dev/config
export default defineConfig({
  server: {
    port: 3001,
  },

  plugins: [
    vue(),
    esbuildPluginBrowserslist(browserslist()),
    tsconfig({
      extensions: [".vue"],
      loose: true,
    }),
  ],
})

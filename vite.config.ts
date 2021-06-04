import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tsconfig from "vite-tsconfig-paths"
import { esbuildPluginBrowserslist } from "esbuild-plugin-browserslist"
import browserslist from "browserslist"

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    esbuildPluginBrowserslist(browserslist()),
    vue(),
    tsconfig({
      extensions: [".vue"],
      loose: true,
    }),
  ],
})

import { load } from "fathom-client"
import { createApp } from "vue"

import App from "./app.vue"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)

app.mount("#app")

load("LLJJZWJA", { url: "https://mammal.haglund.dev/script.js" })

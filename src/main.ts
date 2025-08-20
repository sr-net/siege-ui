import { createVaporApp } from "vue"

import App from "./app.vue"

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createVaporApp(App)

app.mount("#app")

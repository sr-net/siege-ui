import { createVaporApp, type VaporComponent } from "vue"

import App from "./app.vue"

const app = createVaporApp(App as VaporComponent)

app.mount("#app")

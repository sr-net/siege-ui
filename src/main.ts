import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import ResizeText from 'vue-resize-text'
import App from './app.vue'

Vue.use(VueCompositionApi)
Vue.use(ResizeText)
Vue.config.productionTip = false

new Vue({ render: h => h(App) }).$mount('#app')

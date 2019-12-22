import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import Script2 from 'vue-script2'
import Ads from 'vue-google-adsense'
import App from './app.vue'

Vue.use(VueCompositionApi)
Vue.use(Script2)
Vue.use(Ads.Adsense)
Vue.config.productionTip = false

new Vue({ render: h => h(App) }).$mount('#app')

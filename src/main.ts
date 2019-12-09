import Vue from 'vue'
import VueCompositionApi, { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

import { apolloClient } from './apollo'
import App from './app.vue'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  ['setup' as any]() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: h => h(App),
}).$mount('#app')

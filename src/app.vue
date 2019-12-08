<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <logo />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import Logo from './components/logo.vue'
import bgImage from './assets/bg-opacity.png'

export default createComponent({
  setup() {
    return { bgImage }
  },
  components: {
    Logo,
  },
})
</script>

<style lang="scss">
#app {
  font-family: Lato, sans-serif;

  background: #111;
}

* {
  box-sizing: border-box;
  user-select: none;
}
</style>

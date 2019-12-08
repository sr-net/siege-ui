<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <Logo />

    <div class="content">
      <Title :loading="state.loading" :title="state.title" />

      <button @click="update">set</button>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import Logo from './components/logo.vue'
import Title from './components/title.vue'
import bgImage from './assets/bg-opacity.png'

export default createComponent({
  name: 'App',
  setup() {
    return { bgImage }
  },
  components: {
    Logo,
    Title,
  },
})
</script>

<style lang="scss">
@import 'variables';

#app {
  font-family: Lato, sans-serif;

  background: #111;
}

* {
  box-sizing: border-box;
  user-select: none;
}

.content {
  width: $width;
  max-width: 100%;
  margin: 0 auto;
}
</style>

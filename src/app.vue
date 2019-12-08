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
  background: #0d0d0d;
}

* {
  box-sizing: border-box;
  user-select: none;

  transition: $transitions;
}

.content {
  width: $width;
  max-width: 100%;
  margin: 0 auto;

  box-shadow: 1px 3px 8px transparentize(black, 0.25);
}
</style>

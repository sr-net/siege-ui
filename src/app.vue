<template>
  <div id="app">
    <logo />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import Logo from './components/logo.vue'

export default createComponent({
  components: {
    Logo,
  },
})
</script>

<style lang="scss">
body {
  background: #111;
  font-family: Lato, sans-serif;
}

* {
  box-sizing: border-box;
  user-select: none;
}
</style>

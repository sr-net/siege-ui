<template>
  <img class="logo" alt="stratroulette.net" :src="logo" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { getHoliday } from '@/holidays'

const logosContext = require.context('../assets/logos', false)

export default createComponent({
  setup() {
    const holiday = getHoliday()

    return {
      logo: logosContext(`./${holiday}.png`) as string
    }
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.logo {
  display: block;

  min-height: 216px;
  width: $width;
  max-width: 90%;
  margin: auto auto 25px;
  padding-top: 25px;

  color: white;

  @include mobile {
    display: none;
  }
}
</style>

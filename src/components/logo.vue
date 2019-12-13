<template>
  <img class="logo" :class="{ mobile }" alt="stratroulette.net" :src="logo" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { getHoliday } from '@/holidays'

const logosContext = require.context('../assets/logos', false)

export default createComponent({
  props: {
    mobile: Boolean
  },
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

  width: $width;
  max-width: 90%;
  margin: auto auto 25px;
  padding-top: 25px;

  color: white;

  &:not(.mobile) {
    min-height: 216px;

    @include mobile {
      display: none;
    }
  }

  &.mobile {
    @include notMobile {
      display: none;
    }
  }
}
</style>

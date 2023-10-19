<template>
  <img class="logo" :class="{ mobile }" alt="stratroulette.net" :src="logo" />
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { getHoliday } from "@/holidays"

const logos = import.meta.glob<{ default: string }>("../assets/logos/*.png", {
  eager: true,
})

export default defineComponent({
  props: {
    mobile: Boolean,
  },
  setup() {
    const holiday = getHoliday()

    return {
      logo: logos[`../assets/logos/${holiday}.png` as const]?.default,
    }
  },
})
</script>

<style scoped lang="scss">
@import "../variables";

.logo {
  position: relative;
  display: block;

  width: $width;
  max-width: 90%;
  margin: 0 auto 25px;
  padding-top: 25px;

  color: white;
  z-index: 1;

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

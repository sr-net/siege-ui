<template>
  <img class="logo" :class="{ mobile }" alt="" :src="logo" />
</template>

<script lang="ts" setup>
import { computed } from "vue"

import { getHoliday } from "@/holidays"

defineProps<{ mobile?: boolean }>()

const logos = import.meta.glob<{ default: string }>("../assets/logos/*.png", {
  eager: true,
})

const logo = computed(() => logos[`../assets/logos/${getHoliday()}.png` as const]?.default)
</script>

<style scoped lang="scss">
@import "../variables.scss";

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

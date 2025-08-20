<template>
  <div ref="container" class="christmas-container" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

const handleBlur = (el: HTMLDivElement | null) => () => {
  if (el == null) return

  el.style.animationPlayState = "paused, paused, paused"
}

const handleFocus = (el: HTMLDivElement | null) => () => {
  if (el == null) return

  el.style.animationPlayState = ""
}

const container = ref<HTMLDivElement>()

onMounted(() => {
  window.addEventListener("blur", handleBlur(container.value!))
  window.addEventListener("focus", handleFocus(container.value!))
})

onUnmounted(() => {
  window.removeEventListener("blur", handleBlur(container.value!))
  window.removeEventListener("focus", handleFocus(container.value!))
})
</script>

<style scoped lang="scss">
@use "../theme";

@keyframes snowfall {
  to {
    background-position:
      1000px 500px,
      400px 400px,
      -300px 300px;
  }
}

.christmas-container {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;

  background:
    url(/christmas/snow.png), url(/christmas/snow2.png), url(/christmas/snow3.png);

  animation: snowfall 45s infinite linear;
  background-size: 500px, 400px, 300px;

  opacity: 1;
  transition: opacity 10s;
  @include theme.mobile {
    opacity: 0.25;
  }

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
}
</style>

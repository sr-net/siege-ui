<template functional>
  <div class="christmas-container" />
</template>

<style scoped lang="scss">
@import '../variables';

@keyframes snowfall {
  to {
    background-position: 1000px 500px, 400px 400px, -300px 300px;
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

  background: url(/christmas/snow.png), url(/christmas/snow2.png),
    url(/christmas/snow3.png);

  animation: snowfall 45s infinite linear;
  background-size: 500px, 400px, 300px;

  opacity: 1;
  transition: opacity 10s;

  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
}
</style>

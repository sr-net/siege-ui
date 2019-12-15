<template functional>
  <div class="disclaimer" :class="{ mobile: props.mobile }">
    Please only play Strats as a five man group.
    <br v-if="props.mobile" />
    Don't ruin other people's games.
  </div>
</template>

<script lang="ts">
export default {
  props: {
    mobile: Boolean,
  },
}
</script>

<style scoped lang="scss">
@import '../variables';

.disclaimer {
  position: relative;
  color: $text300;
  white-space: pre-wrap;

  @include notMobile {
    &.mobile {
      display: none;
    }
  }

  @include mobile {
    &:not(.mobile) {
      display: none;
    }
  }
}
</style>

<template>
  <div class="disclaimer" :class="{ mobile: mobile }">
    <Adsense
      is-non-personalized-ads
      data-ad-client="ca-pub-2760086516112871"
      :data-ad-slot="isMobile ? '3273924000' : '3859200341'"
      :data-ad-format="isMobile ? 'rectangle' : 'horizontal'"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    mobile: Boolean,
  },
  setup() {
    const isMobile = window.matchMedia('(max-width: 600px)').matches

    return { isMobile }
  },
}
</script>

<style scoped lang="scss">
@import '../variables';

.disclaimer {
  position: relative;
  color: $text300;
  box-sizing: content-box;
  width: 728px;

  &.mobile {
    margin: auto;
    width: 330px;
    height: 150px;
  }

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

<template>
  <div class="description-container">
    <div v-if="description != null" class="description" :class="{ loading }">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
    },
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.description-container {
  width: 100% !important;

  background: $bg50Trans;
  color: $text400;
  text-align: center;
  font-size: 24px;
  padding: 10px 20px;

  @include mobile {
    height: 100%;
  }

  @include notMobile {
    padding: 10px 50px;
  }

  & > .description {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 125px;
    width: 100%;
    user-select: text;

    transition: $transitions, opacity 0.15s;

    &.loading {
      opacity: 0;
    }
  }
}
</style>

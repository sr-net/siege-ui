<template>
  <div
    class="description-container"
    :style="{ height: `${description != null ? height : 0}px` }"
  >
    <div
      ref="content"
      :key="description"
      class="description"
      :class="{ loading }"
    >
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, watch } from '@vue/composition-api'

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
  setup() {
    const content = ref<HTMLDivElement>(null)
    const height = ref(0)

    watch(content, (newVal, oldVar) => {
      if (newVal?.innerText === oldVar?.innerText) return

      height.value = newVal?.getBoundingClientRect().height ?? 0
    })

    return { height, content }
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.description-container {
  width: 100%;
  height: 0;

  background: $bg50Trans;
  color: $text400;
  text-align: center;
  font-size: 24px;

  transition: $transitions, height 0.25s;

  @include mobile {
    height: 100% !important;
    background: $bg50Mobile;
  }

  & > .description {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 125px;
    width: 100%;
    user-select: text;
    transition: $transitions, opacity 0.25s;

    padding: 10px 20px;

    @include notMobile {
      padding: 15px 75px;
    }

    &.loading {
      opacity: 0;
    }
  }
}
</style>

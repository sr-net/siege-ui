<template>
  <div ref="container" class="title-container">
    <div class="title" :class="{ start: !initiated }">
      {{ state.currentTitle }}
    </div>

    <div class="title">Loading...</div>

    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watchEffect } from "vue"

const props = defineProps<{
  initiated: boolean
  loading: boolean
  title: string | null | undefined
}>()

const container = ref<HTMLDivElement>()

const state = reactive({
  currentTitle: props.title,
  height: 70,
})

onMounted(() => {
  state.height = container.value!.getBoundingClientRect().height ?? 70
})

watchEffect(() => {
  if (!props.initiated) return

  if (props.loading) {
    container.value?.scrollTo({ top: 0 })

    container.value?.scrollTo({
      top: state.height,
      behavior: "smooth",
    })
  }

  if (!props.loading) {
    // Default to nice text
    state.currentTitle = props.title ?? "Select a team to begin!"
    container.value?.scrollTo({
      top: state.height * 2,
      behavior: "smooth",
    })
  }
})
</script>

<style scoped lang="scss">
@import "../variables.scss";

.title-container {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 100%;
  overflow: hidden;
  background: $bg200;
  color: $text400;
  border-bottom: 2px solid $border;

  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Catamaran", sans-serif;
    font-weight: 800;
    font-size: 40px;
    line-height: 100%;
    flex-shrink: 0;
    height: 70px;
    width: 100%;
    padding: 10px 25px;
    user-select: text;

    transition:
      $transitions,
      font-size 1s;

    @include mobile {
      font-size: 28px;

      &.start {
        font-size: 30px !important;
      }
    }
  }
}
</style>

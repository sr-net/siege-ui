<template>
  <div ref="container" class="title-container">
    <div class="title">
      {{ initiated ? state.currentTitle : 'Select a team to begin!' }}
    </div>

    <div class="title">Loading...</div>

    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from '@vue/composition-api'

export default createComponent({
  props: {
    initiated: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
    },
  },
  setup(props) {
    const container = ref<HTMLDivElement>(null)

    const state = reactive({
      currentTitle: props.title,
      height: 70,
    })

    onMounted(() => {
      state.height = container.value!.getBoundingClientRect().height ?? 70
    })

    watch(() => {
      if (!props.initiated) return

      if (props.loading) {
        container.value?.scrollTo({ top: 0 })

        container.value?.scrollTo({
          top: state.height,
          behavior: 'smooth',
        })
      }

      if (!props.loading) {
        // Default to nice text
        state.currentTitle = props.title ?? 'Select a team to begin!'
        container.value?.scrollTo({
          top: state.height * 2,
          behavior: 'smooth',
        })
      }
    })

    return { state, container }
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.title-container {
  display: flex;
  flex-direction: column;
  height: 70px;
  width: 100%;
  overflow: hidden;
  background: $bg200;
  color: $text;

  font-weight: 600;
  font-size: 25px;

  @include notMobile {
    font-size: 35px;
  }

  & > .title {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <div
    class="description-container"
    :style="{ height: `${description != null ? height : 0}px` }"
  >
    <div
      ref="descWrapper$"
      :key="description ?? 'empty'"
      class="description-wrapper"
      :class="{ loading }"
    >
      <span ref="desc$" class="desc">
        {{ description }}
      </span>
    </div>

    <Transition v-if="isMobile && !loading">
      <div v-if="description == null" class="logo-container">
        <Logo mobile />
      </div>
    </Transition>

    <div class="menu">
      <a
        href="https://github.com/sr-net"
        target="_blank"
        rel="noopener"
        aria-description="Link to GitHub Source"
        v-html="githubLogo"
      />
    </div>
  </div>
</template>

<script vapor setup lang="ts">
import { ref, watch } from "vue"

import githubLogo from "../assets/github.svg?raw"

import Logo from "./logo.vue"

const props = defineProps<{
  loading: boolean
  description: string | null | undefined
}>()

const isMobile = window.innerWidth < 768

const descWrapper$ = ref<HTMLDivElement>()
const desc$ = ref<HTMLSpanElement>()
const height = ref(0)

watch(
  () => props.description,
  (newVal, oldVar) => {
    if (newVal === oldVar) return

    height.value = Math.max(desc$.value!.getBoundingClientRect().height + 35, 125)
  },
  { flush: "post" },
)
</script>

<style scoped lang="scss">
@use "../theme";

.desc {
  height: fit-content;
}

.description-container {
  position: relative;
  width: 100%;
  height: 0;

  background: theme.$bg50Trans;
  color: theme.$text400;
  text-align: center;
  font-size: 24px;
  overflow: hidden;

  transition:
    theme.$transitions,
    height 0.25s;

  @include theme.mobile {
    height: 100% !important;
    background: theme.$bg50Mobile;
    font-size: 20px;
  }

  & > .description-wrapper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 125px;
    width: 100%;
    user-select: text;
    transition:
      theme.$transitions,
      opacity 0.25s;

    padding: 15px 75px;

    @include theme.mobile {
      max-height: 100%;
      padding: 10px 30px;
      overflow: scroll;
    }

    &.loading {
      opacity: 0;
    }
  }

  & > .logo-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    transition: opacity 0.25s;

    &.v-leave-to {
      opacity: 0;
    }

    & > .logo {
      padding-top: 0;
    }
  }

  & > .menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 5px;
    bottom: 5px;

    & > a,
    & > button {
      position: relative;
      height: 35px;
      width: 35px;
      padding: 5px;
      border: 0;
      background: theme.$button;
      border-radius: 100%;
      cursor: pointer;
      color: #eee;

      & > img {
        height: 100%;
        width: 100%;

        &.github {
          filter: brightness(9);
        }
      }
    }
  }
}
</style>

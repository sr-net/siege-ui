<template>
  <div
    class="description-container"
    :style="{ height: `${description != null ? height : 0}px` }"
  >
    <div ref="content" :key="description" class="description" :class="{ loading }">
      {{ description }}
    </div>

    <transition>
      <div v-if="!loading && description == null" class="logo-container">
        <Logo mobile />
      </div>
    </transition>

    <div class="menu">
      <a href="https://github.com/sr-net" target="_blank" rel="noopener">
        <img class="github" :src="githubLogo" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"

import githubLogo from "../assets/github.svg"

import Logo from "./logo.vue"

export default defineComponent({
  components: { Logo },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
  },
  setup() {
    const content = ref<HTMLDivElement>(null)
    const height = ref(0)

    watch(content, (newVal, oldVar) => {
      if (newVal?.textContent === oldVar?.textContent) return

      height.value = newVal?.getBoundingClientRect().height ?? 0
    })

    return { height, content, githubLogo }
  },
})
</script>

<style scoped lang="scss">
@import "../variables";

.description-container {
  position: relative;
  width: 100%;
  height: 0;

  background: $bg50Trans;
  color: $text400;
  text-align: center;
  font-size: 24px;
  overflow: hidden;

  transition:
    $transitions,
    height 0.25s;

  @include mobile {
    height: 100% !important;
    background: $bg50Mobile;
    font-size: 20px;
  }

  & > .description {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 125px;
    width: 100%;
    user-select: text;
    transition:
      $transitions,
      opacity 0.25s;

    padding: 15px 75px;

    @include mobile {
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
      background: $button;
      border-radius: 100%;
      cursor: pointer;

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

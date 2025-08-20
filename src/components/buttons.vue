<template>
  <div class="buttons-container">
    <button class="team-button" :disabled="loading" @click="setTeam('atk')">ATK</button>

    <button class="like-button" :class="{ liked }" @click="toggleLike">
      <img :src="likeIcon" />
    </button>

    <button class="team-button" :disabled="loading" @click="setTeam('def')">DEF</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

import likeIcon from "../assets/like.svg"

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    liked: {
      type: Boolean,
    },
    setTeam: {
      type: Function as PropType<(team: string) => void>,
      required: true,
    },
    toggleLike: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup: () => ({ likeIcon }),
})
</script>

<style scoped lang="scss">
@import "../variables";

.buttons-container {
  position: relative;
  flex-shrink: 0;
  display: flex;
  width: 100%;

  & > .team-button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;

    background: $button;
    color: $text300;
    font-family: "Catamaran", Impact, sans-serif;
    font-size: 40px;
    font-weight: 800;
    border: 0;
    line-height: 100%;

    cursor: pointer;

    transition: background 0.25s;

    @include mobile {
      font-size: 35px;
    }

    &:first-child {
      border-right: 1px solid $border;
    }

    &:last-child {
      border-left: 1px solid $border;
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
    }

    &:hover {
      background: $buttonHover;
    }

    &:active {
      background: $buttonClick;
    }
  }

  & > .like-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 45px;
    width: 45px;
    padding: 5px;
    padding-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: $button;
    border: 2px solid $green;
    border-radius: 100%;
    cursor: pointer;

    transition:
      $transitions,
      transform 0.1s;

    & > img {
      width: 100%;
      height: 100%;

      transition: filter 0.1s;
    }

    &:hover {
      transform: translate(-50%, -50%) scale(1.025);
    }

    &.liked {
      background: $green;

      & > img {
        filter: brightness(10);
      }
    }
  }
}
</style>

<template>
  <div class="buttons-container">
    <button class="team-button" :disabled="loading" @click="setTeam('atk')">ATK</button>

    <button
      class="like-button"
      :class="{ liked }"
      @click="toggleLike"
      v-html="likeIcon"
    />

    <button class="team-button" :disabled="loading" @click="setTeam('def')">DEF</button>
  </div>
</template>

<script vapor setup lang="ts">
import type { Team } from "@/graphql/requests.ts"

import likeIcon from "../assets/like.svg?raw"

defineProps<{
  loading: boolean
  liked?: boolean
  setTeam: (team?: Team) => Promise<void>
  toggleLike: () => void
}>()
</script>

<style scoped lang="scss">
@use "../theme";

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

    background: theme.$button;
    color: theme.$text300;
    font-family: "Catamaran", Impact, sans-serif;
    font-size: 40px;
    font-weight: 800;
    border: 0;
    line-height: 100%;

    cursor: pointer;

    transition: background 0.25s;

    @include theme.mobile {
      font-size: 35px;
    }

    &:first-child {
      border-right: 1px solid theme.$border;
    }

    &:last-child {
      border-left: 1px solid theme.$border;
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
    }

    &:hover {
      background: theme.$buttonHover;
    }

    &:active {
      background: theme.$buttonClick;
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
    padding-left: 6px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: theme.$button;
    border: 2px solid theme.$green;
    --icon-border: #{theme.$green};
    --icon-fill: transparent;
    border-radius: 100%;
    cursor: pointer;

    transition:
      theme.$transitions,
      transform 0.1s;

    &:hover {
      transform: translate(-50%, -50%) scale(1.025);
    }

    &.liked {
      background: theme.$green;
      --icon-border: #eee;
    }
  }
}
</style>

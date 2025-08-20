<template>
  <div class="gamemodes-container">
    <button
      v-for="gm in Object.values(Gamemode)"
      :key="gm"
      class="gamemode"
      :class="{ selected: gm === selected }"
      :title="gm"
      @click="setSelected(gm)"
      v-html="gamemodeIcons[gm]"
    />
  </div>
</template>

<script vapor setup lang="ts">
import { Gamemode } from "@/graphql/generated"

import bombsIcon from "../assets/bombs.svg?raw"
import captureIcon from "../assets/capture_areas.svg?raw"
import hostageIcon from "../assets/hostage.svg?raw"

defineProps<{ selected: string | null | undefined }>()
const emit = defineEmits<{ update: [Gamemode] }>()

const gamemodeIcons = {
  [Gamemode.Bombs]: bombsIcon,
  [Gamemode.CaptureAreas]: captureIcon,
  [Gamemode.Hostage]: hostageIcon,
} as const

const setSelected = (gamemode: Gamemode) => emit("update", gamemode)
</script>

<style scoped lang="scss">
@use "../theme";

.gamemodes-container {
  width: 100% !important;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background: theme.$bg200;
  padding: 3px 20px;

  & > .gamemode {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: content-box;
    height: 35px;
    width: 35px;
    padding: 5px 25px;
    border: 0;
    background: 0;
    cursor: pointer;
    opacity: 0.2;
    transition:
      theme.$transitions,
      opacity 0.25s;

    &.selected {
      opacity: 1;
    }

    & > img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="gamemodes-container">
    <button
      v-for="gm in gamemodes"
      :key="gm"
      class="gamemode"
      :class="{ selected: gm === selected }"
      :title="gm"
      @click="setSelected(gm)"
    >
      <img :alt="gm" :src="getGamemodeIcon(gm)" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Gamemode } from "@/graphql/generated"

defineProps<{ selected: string | null | undefined }>()
const emit = defineEmits<{ update: [Gamemode] }>()

const gamemodeIcons = import.meta.glob<{ default: string }>(
  "../assets/{capture_areas,bombs,hostage}.svg",
  { eager: true },
)

const gamemodes = Object.values(Gamemode)

const setSelected = (gamemode: Gamemode) => emit("update", gamemode)

const getGamemodeIcon = (gamemode: Gamemode): string | undefined => {
  return gamemodeIcons[`../assets/${gamemode.toLowerCase()}.svg`]?.default
}
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

<template>
  <div class="gamemodes-container">
    <button
      v-for="gm in gamemodes"
      :key="gm"
      class="gamemode"
      :class="{ selected: gm === selected }"
      @click="setSelected(gm)"
    >
      <img :src="getGamemodeIcon(gm)" />
    </button>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { Gamemode } from '@/graphql/generated'

const gamemodesContext = require.context(
  '../assets',
  false,
  /areas|bombs|hostage/,
)

const gamemodes = Object.values(Gamemode)

export default createComponent({
  props: {
    selected: {
      type: String,
    },
  },

  setup(_, context) {
    const setSelected = (gamemode: Gamemode) => context.emit('update', gamemode)

    const getGamemodeIcon = (gamemode: Gamemode) =>
      gamemodesContext(`./${gamemode.toLowerCase()}.svg`)

    return { gamemodes, setSelected, getGamemodeIcon }
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.gamemodes-container {
  width: 100% !important;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background: $bg200;
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
    transition: $transitions, opacity 0.15s;

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
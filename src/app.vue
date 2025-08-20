<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <Transition name="fade" type="transition">
      <Christmas v-if="getHoliday() === 'christmas'" />
    </Transition>

    <Logo />

    <div class="content">
      <Title :initiated="initiated" :loading="loading" :title="strat?.title" />

      <Info
        :loading="loading"
        :short-id="strat?.shortId"
        :author="strat?.author"
        :score="strat?.score"
      />

      <Description :loading="loading" :description="strat?.description" />

      <Gamemodes :selected="gamemode" @update="setGamemode" />

      <Buttons
        :loading="loading"
        :liked="strat?.liked"
        :set-team="fetchStrat"
        :toggle-like="toggleLiked"
      />
    </div>
  </div>
</template>

<script vapor setup lang="ts">
import { defineAsyncComponent, watch } from "vue"

import bgImage from "./assets/bg-opacity.webp"
import Buttons from "./components/buttons.vue"
import Description from "./components/description.vue"
import Gamemodes from "./components/gamemodes.vue"
import Info from "./components/info.vue"
import Logo from "./components/logo.vue"
import Title from "./components/title.vue"
import { useStrat } from "./graphql/requests"
import { getHoliday } from "./holidays"

const Christmas = defineAsyncComponent(() => import("./components/christmas.vue"))

const {
  initiated,
  shortId,
  gamemode,
  strat,
  loading,
  fetchStrat,
  setGamemode,
  toggleLiked,
} = useStrat()

watch(
  shortId,
  (newValue) => {
    if (newValue == null || newValue === strat.value?.shortId) {
      return
    }

    void fetchStrat()
  },
  { immediate: true },
)
</script>

<style lang="scss">
@use "sass:color";
@use "theme";

#app {
  font-family: Lato, sans-serif;
  background: #0d0d0d;

  display: flex;
  flex-direction: column;
  align-items: center;
}

* {
  box-sizing: border-box;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  :focus {
    outline: none;
  }

  transition: theme.$transitions;

  &::-moz-focus-inner {
    border: 0;
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: theme.$width;
  max-width: 100%;
  margin: 0 auto;

  overflow: hidden;
  box-shadow: 1px 3px 8px color.adjust(black, $alpha: -0.25);
  z-index: 1;

  @include theme.notMobile {
    border-radius: 5px;
  }

  @include theme.mobile {
    height: 100%;
  }
}
</style>

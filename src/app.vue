<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <transition name="fade" type="transition">
      <Christmas v-if="holiday === 'christmas'" />
    </transition>

    <Logo />

    <div class="content">
      <StratTitle :initiated="initiated" :loading="loading" :title="strat.title" />

      <Info
        :loading="loading"
        :short-id="strat.shortId"
        :author="strat.author"
        :score="strat.score"
      />

      <Description :loading="loading" :description="strat.description" />

      <Gamemodes :selected="gamemode" @update="setGamemode" />

      <Buttons
        :loading="loading"
        :liked="strat.liked"
        :set-team="fetchForTeam"
        :toggle-like="toggleLiked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, watch } from "vue"

import bgImage from "./assets/bg-opacity.png"
import Buttons from "./components/buttons.vue"
import Description from "./components/description.vue"
import Gamemodes from "./components/gamemodes.vue"
import Info from "./components/info.vue"
import Logo from "./components/logo.vue"
import Title from "./components/title.vue"
import { useStrat } from "./graphql/requests"
import { getHoliday } from "./holidays"

export default defineComponent({
  name: "App",
  components: {
    Logo,
    Christmas: defineAsyncComponent(() => import("./components/christmas.vue")),
    StratTitle: Title,
    Info,
    Description,
    Gamemodes,
    Buttons,
  },
  setup() {
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

    watch(shortId, (newValue) => {
      if (newValue == null || newValue === strat.value?.shortId) {
        return
      }

      void fetchStrat()
    })

    return {
      bgImage,
      holiday: getHoliday(),
      gamemode,
      initiated,
      shortId,
      strat,
      loading,
      fetchForTeam: fetchStrat,
      setGamemode,
      toggleLiked,
    }
  },
})
</script>

<style lang="scss">
@import "./variables.scss";

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

  transition: $transitions;

  &::-moz-focus-inner {
    border: 0;
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: $width;
  max-width: 100%;
  margin: 0 auto;

  overflow: hidden;
  box-shadow: 1px 3px 8px transparentize(black, 0.25);
  z-index: 1;

  @include notMobile {
    border-radius: 5px;
  }

  @include mobile {
    height: 100%;
  }
}
</style>

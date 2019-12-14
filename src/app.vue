<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <Logo />

    <div class="content">
      <Title :initiated="initiated" :loading="loading" :title="strat.title" />

      <Info :loading="loading" :author="strat.author" :score="strat.score" />

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
import { createComponent, ref, watch } from '@vue/composition-api'

import Logo from './components/logo.vue'
import Title from './components/title.vue'
import Info from './components/info.vue'
import Description from './components/description.vue'
import Gamemodes from './components/gamemodes.vue'
import Buttons from './components/buttons.vue'
import bgImage from './assets/bg-opacity.png'

import { Gamemode, StratQuery } from './graphql/generated'
import { randomStratQuery, toggleLikeMutation } from '@/graphql/requests'

type LocalStorage = {
  gamemode: Gamemode
  exclude: number[]
}

const localStorageRef = <
  K extends keyof LocalStorage,
  V extends LocalStorage[K],
  D extends V | null
>(
  key: K,
  defaultValue?: D,
) => {
  const theRef = ref<V | D>(
    JSON.parse(localStorage.getItem(key) ?? 'null') ?? defaultValue ?? null,
  )

  watch(theRef, () => {
    localStorage.setItem(key, JSON.stringify(theRef.value))
  })

  return theRef
}

type Team = 'atk' | 'def'

export default createComponent({
  name: 'App',
  setup() {
    const gamemode = localStorageRef('gamemode')
    const exclude = localStorageRef('exclude', [] as number[])

    const initiated = ref(false)
    const strat = ref<StratQuery['strat']>({ title: 'Select a team to begin!' })
    const loading = ref(false)

    const fetchForTeam = async (team: Team) => {
      if (gamemode.value == null) return

      if (strat.value?.shortId != null) {
        if (exclude.value.length >= 15) {
          exclude.value.splice(0, 1)
        }

        exclude.value.push(strat.value.shortId)
      }

      initiated.value = true
      loading.value = true
      const result = await randomStratQuery({
        atk: team === 'atk',
        def: team === 'def',
        exclude: exclude.value,
        gamemode: gamemode.value,
      })

      setTimeout(() => {
        loading.value = false
        strat.value = result ?? null
      }, 250)
    }

    const setGamemode = (gm: Gamemode) => {
      gamemode.value = gm
    }

    const toggleLiked = async () => {
      if (strat.value == null) return null

      const result = await toggleLikeMutation(strat.value.liked, {
        uuid: strat.value.uuid,
      })

      strat.value = {
        ...strat.value,
        ...result,
      }
    }

    return {
      bgImage,
      gamemode,
      initiated,
      strat,
      loading,
      fetchForTeam,
      setGamemode,
      toggleLiked,
    }
  },
  components: {
    Logo,
    Title,
    Info,
    Description,
    Gamemodes,
    Buttons,
  },
})
</script>

<style lang="scss">
@import 'variables';

#app {
  font-family: Lato, sans-serif;
  background: #0d0d0d;
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
  display: flex;
  flex-direction: column;
  width: $width;
  max-width: 100%;
  margin: 0 auto;

  overflow: hidden;
  box-shadow: 1px 3px 8px transparentize(black, 0.25);

  @include notMobile {
    border-radius: 5px;
  }

  @include mobile {
    height: 100%;
  }
}
</style>

<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <transition name="fade" type="transition">
      <Christmas v-if="holiday === 'christmas'" />
    </transition>

    <Logo />

    <div class="content">
      <Title :initiated="initiated" :loading="loading" :title="strat.title" />

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
import {
  createComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from '@vue/composition-api'

import Logo from './components/logo.vue'
import Title from './components/title.vue'
import Info from './components/info.vue'
import Description from './components/description.vue'
import Gamemodes from './components/gamemodes.vue'
import Buttons from './components/buttons.vue'
import bgImage from './assets/bg-opacity.png'

import { Gamemode, StratQuery } from './graphql/generated'
import { randomStratQuery, toggleLikeMutation } from './graphql/requests'
import { getHoliday } from './holidays'

type LocalStorage = {
  gamemode: Gamemode
  exclude: number[]
}

const getShortIdFromUrl = (url: string): number | null => {
  const hash = Number(/#(\d+)/.exec(url)?.[1])

  return !isNaN(hash) ? hash : null
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
    const shortId = ref(getShortIdFromUrl(location.href))
    const strat = ref<StratQuery['strat']>({ title: 'Select a team to begin!' })
    const loading = ref(false)

    const fetchStrat = async (team?: Team) => {
      if (gamemode.value == null) return

      if (team != null) {
        shortId.value = null
        location.hash = ''
      }

      if (strat.value?.shortId != null) {
        if (exclude.value.length >= 15) {
          exclude.value.splice(0, 1)
        }

        exclude.value.push(strat.value.shortId)
      }

      initiated.value = true
      loading.value = true

      const random = shortId.value == null
      const result = await randomStratQuery({
        random,
        shortId: shortId.value,
        atk: team === 'atk',
        def: team === 'def',
        exclude: !random ? exclude.value : [],
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

    const updateShortId = ({ newURL }: HashChangeEvent) => {
      shortId.value = getShortIdFromUrl(newURL)
    }

    onMounted(() => {
      window.addEventListener('hashchange', updateShortId)
    })

    onUnmounted(() => {
      window.removeEventListener('hashchange', updateShortId)
    })

    watch(shortId, newValue => {
      if (newValue === strat.value?.shortId) return

      fetchStrat()
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
  components: {
    Logo,
    Christmas: () =>
      import(/* webpackChunkName: "christmas" */ './components/christmas.vue'),
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

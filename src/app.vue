<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <Logo />

    <div class="content">
      <Title
        :initiated="team != null"
        :loading="loading"
        :title="strat.title"
      />

      <Info :loading="loading" :author="strat.author" :score="strat.score" />

      <Description :loading="loading" :description="strat.description" />

      <Gamemodes :selected="gamemode" @update="setGamemode" />

      <Buttons
        :loading="loading"
        :liked="strat.liked"
        :set-team="setTeam"
        :toggle-like="() => {}"
      />
    </div>

    <button @click="setTeam(null)">RESET</button>
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

import { Gamemode, StratQuery, StratQueryVariables } from './graphql/generated'
import stratQuery from './graphql/strat.graphql'

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

// http://localhost:3000/graphql
const fetchStrat = async (variables: StratQueryVariables) => {
  const response = await fetch('https://siege.stratroulette.net/graphql', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: stratQuery,
      variables,
    }),
  })

  const { data } = (await response.json()) as { data: StratQuery }

  return data?.strat
}

type Team = 'atk' | 'def'

export default createComponent({
  name: 'App',
  setup() {
    const team = ref<Team>(null)
    const gamemode = localStorageRef('gamemode')
    const exclude = localStorageRef('exclude', [] as number[])
    const strat = ref<StratQuery['strat']>({})
    const loading = ref(false)

    const setTeam = async (t: Team) => {
      if (t == null) {
        strat.value = {} as any
      }

      team.value = t

      if (strat.value?.shortId != null) {
        if (exclude.value.length >= 15) {
          exclude.value.splice(0, 1)
        }

        exclude.value.push(strat.value.shortId)
      }

      loading.value = true
      const result = await fetchStrat({
        atk: team.value === 'atk',
        def: team.value === 'def',
        exclude: exclude.value,
        gamemode: gamemode.value!,
      })

      setTimeout(() => {
        loading.value = false
        strat.value = result
      }, 250)
    }

    const setGamemode = (gm: Gamemode) => {
      gamemode.value = gm
    }

    return { bgImage, team, gamemode, strat, loading, setTeam, setGamemode }
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

  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 3px 8px transparentize(black, 0.25);

  @include mobile {
    height: 100%;
  }
}
</style>

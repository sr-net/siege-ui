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
        :toggle-like="toggleLiked"
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

import {
  Gamemode,
  LikeStratMutation,
  LikeStratMutationVariables,
  StratQuery,
  StratQueryVariables,
  UnlikeStratMutation,
  UnlikeStratMutationVariables,
} from './graphql/generated'
import stratQuery from './graphql/strat.graphql'
import likeQuery from './graphql/like-strat.graphql'
import unlikeQuery from './graphql/unlike-strat.graphql'

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

const postGraphql = async <R, V>(query: string, variables: V) => {
  const response = await fetch('https://siege.stratroulette.net/graphql', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  return response.json() as { data?: R }
}

const fetchStrat = async (variables: StratQueryVariables) => {
  const result = await postGraphql<StratQuery, StratQueryVariables>(
    stratQuery,
    variables,
  )

  return result.data?.strat
}

const toggleLikeMutation = async <B extends boolean>(
  liked: B,
  variables: LikeStratMutationVariables | UnlikeStratMutationVariables,
) => {
  const result = await postGraphql<
    LikeStratMutation | UnlikeStratMutation,
    typeof variables
  >(liked ? unlikeQuery : likeQuery, variables)

  return (
    (result.data as LikeStratMutation)?.likeStrat ??
    (result.data as UnlikeStratMutation)?.unlikeStrat
  )
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
      if (gamemode.value == null) return

      if (t == null) {
        strat.value = null
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

    return { bgImage, team, gamemode, strat, loading, setTeam, setGamemode, toggleLiked }
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

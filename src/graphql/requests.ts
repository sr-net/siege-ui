import { onMounted, onUnmounted, reactive, ref, toRefs } from "vue"

import { getShortIdFromUrl, localStorageRef } from "@/utils"

import {
  Gamemode,
  type LikeStratMutation,
  type LikeStratMutationVariables,
  type StratQuery,
  type StratQueryVariables,
  type UnlikeStratMutation,
  type UnlikeStratMutationVariables,
} from "./generated"
import likeQuery from "./like-strat.graphql?raw"
import stratQuery from "./strat.graphql?raw"
import unlikeQuery from "./unlike-strat.graphql?raw"

export type Team = "atk" | "def"

const postGraphql = async <R, V>(query: string, variables: V) => {
  const response = await fetch("https://siege.stratroulette.net/graphql", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  return (await response.json()) as { data?: R }
}

export const randomStratQuery = async (variables: StratQueryVariables) => {
  const result = await postGraphql<StratQuery, StratQueryVariables>(stratQuery, variables)

  return result.data?.strat
}

export const toggleLikeMutation = async <B extends boolean>(
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

export const useStrat = () => {
  const gamemode = localStorageRef("gamemode", Gamemode.Hostage)
  const exclude = localStorageRef("exclude", [] as number[])

  const state = reactive({
    initiated: ref(false),
    shortId: ref(getShortIdFromUrl(location.href)),
    strat: ref<Partial<StratQuery["strat"]>>({
      title: "Select a team to begin!",
    }),
    loading: ref(false),
  })

  const fetchStrat = async (team?: Team) => {
    if (gamemode.value == null) return

    if (team != null) {
      state.shortId = null
    }

    if (state.strat?.shortId != null) {
      if (exclude.value.length >= 15) {
        exclude.value.splice(0, 1)
      }

      exclude.value.push(state.strat.shortId)
    }

    state.initiated = true
    state.loading = true

    const random = state.shortId == null
    const result = await randomStratQuery({
      random,
      shortId: state.shortId,
      atk: team === "atk",
      def: team === "def",
      exclude: !random ? exclude.value : [],
      gamemode: gamemode.value,
    })

    setTimeout(() => {
      state.loading = false
      state.strat = result ?? null
      location.hash = result?.shortId.toString() ?? ""
    }, 250)
  }

  const setGamemode = (gm: Gamemode) => {
    gamemode.value = gm
  }

  const toggleLiked = async () => {
    if (state.strat == null) return null

    const result = await toggleLikeMutation(state.strat.liked!, {
      uuid: state.strat.uuid!,
    })

    state.strat = {
      ...state.strat,
      ...result,
    }
  }

  const updateShortId = ({ newURL }: HashChangeEvent) => {
    state.shortId = getShortIdFromUrl(newURL)
  }

  onMounted(() => {
    window.addEventListener("hashchange", updateShortId)
  })

  onUnmounted(() => {
    window.removeEventListener("hashchange", updateShortId)
  })

  return {
    ...toRefs(state),
    gamemode,
    fetchStrat,
    setGamemode,
    toggleLiked,
  }
}

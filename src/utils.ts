import { ref, watch } from 'vue'
import { Gamemode } from '@/graphql/generated'

type LocalStorage = {
  gamemode: Gamemode
  exclude: number[]
}

export const localStorageRef = <
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

export const getShortIdFromUrl = (url: string): number | null => {
  const hash = Number(/#(\d+)/.exec(url)?.[1])

  return !isNaN(hash) ? hash : null
}

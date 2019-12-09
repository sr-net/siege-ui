<template>
  <div id="app" :style="{ backgroundImage: `url(${bgImage})` }">
    <Logo />

    <div class="content">
      <Title
        :initiated="team != null"
        :loading="loading"
        :title="strat.title"
      />
    </div>

    <button @click="setTeam('atk')">ATK</button>
    <button @click="setTeam('def')">DEF</button>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'

import Logo from './components/logo.vue'
import Title from './components/title.vue'
import bgImage from './assets/bg-opacity.png'

import { StratQuery, StratQueryVariables } from './graphql/generated'
import stratQuery from './strat.graphql'

type Team = 'atk' | 'def'

export default createComponent({
  name: 'App',
  setup() {
    const team = ref<Team>(null)
    const exclude = ref<number[]>([])

    const { result, loading } = useQuery<StratQuery, StratQueryVariables>(
      stratQuery,
      () => ({
        atk: team.value === 'atk',
        def: team.value === 'def',
        exclude: exclude.value,
      }),
      () => ({
        enabled: team.value != null,
      }),
    )

    const strat = useResult(result, {}, data => data.strat)

    const setTeam = (t: Team) => {
      team.value = t

      if (strat.value?.shortId != null) {
        exclude.value.push(strat.value.shortId)
      }
    }

    return { bgImage, team, strat, loading, setTeam }
  },
  components: {
    Logo,
    Title,
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

  transition: $transitions;
}

.content {
  width: $width;
  max-width: 100%;
  margin: 0 auto;

  box-shadow: 1px 3px 8px transparentize(black, 0.25);
}
</style>

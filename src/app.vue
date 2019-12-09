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
    </div>

    <button @click="setTeam('atk')">ATK</button>
    <button @click="setTeam('def')">DEF</button>
    <button @click="setTeam(null)">RESET</button>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'

import Logo from './components/logo.vue'
import Title from './components/title.vue'
import Info from './components/info.vue'
import Description from './components/description.vue'
import bgImage from './assets/bg-opacity.png'

import { StratQuery, StratQueryVariables } from './graphql/generated'
import stratQuery from './strat.graphql'

type Team = 'atk' | 'def'

export default createComponent({
  name: 'App',
  setup() {
    const team = ref<Team>(null)
    const exclude = ref([] as number[])

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
      if (t == null) {
        result.value = null as any
      }

      team.value = t

      if (strat.value?.shortId != null) {
        if (exclude.value.length >= 15) {
          exclude.value.splice(0, 1)
        }

        exclude.value.push(strat.value.shortId)
      }
    }

    return { bgImage, team, strat, loading, setTeam }
  },
  components: {
    Logo,
    Title,
    Info,
    Description,
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

  border-radius: 5px;
  overflow: hidden;
  box-shadow: 1px 3px 8px transparentize(black, 0.25);
}
</style>

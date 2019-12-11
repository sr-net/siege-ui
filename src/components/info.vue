<template>
  <div v-if="author && score" class="info-container" :class="{ loading }">
    <div class="score hidden">
      +{{ score }}
    </div>

    <div class="author">
      <a :href="author.url" target="_blank" rel="noopener">
        {{ prefix }}{{ author.name }}
      </a>
    </div>

    <div class="score">
      +{{ score }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { AuthorType, Strat } from '@/graphql/generated'

type Props = { loading: boolean; author?: Strat['author']; score?: number }

export default createComponent<Props>({
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    author: {
      type: Object,
    },
    score: {
      type: Number,
    },
  },
  setup(props) {
    const prefix = computed(() =>
      props.author?.type === AuthorType.Reddit ? '/u/' : '',
    )

    return { prefix }
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.info-container {
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 25px;
  border-top: 2px solid $border;
  border-bottom: 2px solid $border;

  background: $bg100;
  color: $text400;
  font-size: 15px;
  overflow: hidden;

  & > div {
    transition: $transitions, opacity 0.15s;
  }

  &.loading > div {
    opacity: 0;
  }

  & > .author {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > a {
      padding: 0 25px;
      color: $text300;
      text-decoration: none;
    }
  }

  & > .score {
    flex-shrink: 0;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: $green;
    letter-spacing: 0.25px;

    &.hidden {
      opacity: 0;
    }
  }
}
</style>

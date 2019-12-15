<template>
  <div class="info-container" :class="{ loading, hide: author == null }">
    <div class="short-id">#{{ shortId }}</div>

    <div v-if="author" class="author">
      <a :href="author.url" target="_blank" rel="noopener">
        <img class="type" :src="getAuthorImg(author.type)" />
        {{ prefix }}{{ author.name }}
      </a>
    </div>

    <div class="score">+{{ score }}</div>
  </div>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { AuthorType, Strat } from '@/graphql/generated'

type Props = { loading: boolean; author?: Strat['author']; score?: number }

const authorIconContext = require.context(
  '../assets',
  false,
  /name|reddit|twitch|youtube/,
)

export default createComponent<Props>({
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    shortId: {
      type: Number,
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

    const getAuthorImg = (type: AuthorType) =>
      authorIconContext(`./${type.toLowerCase()}.svg`)

    return { prefix, getAuthorImg }
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
  height: 30px;
  padding: 5px 25px;
  border-bottom: 2px solid $border;

  background: $bg100;
  color: $text400;
  font-size: 15px;
  overflow: hidden;
  transition: $transitions, height 0.25s, padding 0.25s, border-bottom 0.25s;

  @include mobile {
    padding: 5px 15px;
  }

  &.hide {
    height: 0;
    padding: 0 25px;
    border-bottom: 0 solid $border;
  }

  & > div {
    transition: $transitions, opacity 0.25s;
  }

  &.loading > div {
    opacity: 0;
  }

  & > .author {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > a {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $text300;
      text-decoration: none;

      & > .type {
        height: 18px;
        margin-right: 5px;
      }
    }
  }

  & > .short-id,
  & > .score {
    width: 60px;
    flex-shrink: 0;
    font-weight: 300;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.5px;

    &.score {
      color: $green;
      text-align: right;
    }

    &.hidden {
      opacity: 0;
    }
  }
}
</style>

<template>
  <div class="info-container" :class="{ loading, hide: author == null }">
    <div class="short-id" title="Click to copy link!" @click="copyLink">
      #{{ shortId }}
    </div>

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
import copy from "clipboard-copy"
import { computed, defineComponent, PropType } from "vue"

import { AuthorType, Strat } from "@/graphql/generated"

const authorIcons = import.meta.globEager<{ default: string }>(
  "../assets/{name,youtube,twitch,reddit}.svg",
)

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    shortId: {
      type: Number,
      default: null,
    },
    author: {
      type: Object as PropType<Strat["author"]>,
      default: null,
    },
    score: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const prefix = computed(() => (props.author?.type === AuthorType.Reddit ? "/u/" : ""))

    const getAuthorImg = (type: AuthorType) =>
      authorIcons[`../assets/${type.toLowerCase()}.svg`]?.default

    const copyLink = () => {
      void copy(location.href)
    }

    return { prefix, getAuthorImg, copyLink }
  },
})
</script>

<style scoped lang="scss">
@import "../variables";

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
  transition:
    $transitions,
    height 0.25s,
    padding 0.25s,
    border-bottom 0.25s;

  @include mobile {
    padding: 5px 15px;
  }

  &.hide {
    height: 0;
    padding: 0 25px;
    border-bottom: 0 solid $border;
  }

  & > div {
    transition:
      $transitions,
      opacity 0.25s;
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

    &.short-id {
      cursor: pointer;
    }

    &.hidden {
      opacity: 0;
    }
  }
}
</style>

<template>
  <div class="info-container" :class="{ loading, hide: author == null }">
    <div class="short-id" title="Click to copy link!" @click="copyLink">
      #{{ shortId }}
    </div>

    <div v-if="author != null" class="author">
      <a :href="author.url ?? undefined" target="_blank" rel="noopener">
        <span class="type" v-html="authorImage" />
        {{ prefix }}{{ author.name }}
      </a>
    </div>

    <div class="score">+{{ score }}</div>
  </div>
</template>

<script vapor setup lang="ts">
import copy from "clipboard-copy"
import { computed } from "vue"

import { AuthorType, type Strat } from "@/graphql/generated.ts"

import nameIcon from "../assets/name.svg?raw"
import redditIcon from "../assets/reddit.svg?raw"
import twitchIcon from "../assets/twitch.svg?raw"
import youtubeIcon from "../assets/youtube.svg?raw"

const props = defineProps<{
  loading: boolean
  shortId?: number | null
  author?: Strat["author"] | null
  score?: number | null
}>()

const prefix = computed(() => (props.author?.type === AuthorType.Reddit ? "/u/" : ""))

const authorImage = computed(() =>
  props.author?.type === AuthorType.Reddit
    ? redditIcon
    : props.author?.type === AuthorType.Twitch
      ? twitchIcon
      : props.author?.type === AuthorType.Youtube
        ? youtubeIcon
        : nameIcon,
)

const copyLink = () => {
  void copy(location.href)
}
</script>

<style scoped lang="scss">
@use "../theme";

.info-container {
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding: 5px 25px;
  border-bottom: 2px solid theme.$border;

  background: theme.$bg100;
  color: theme.$text400;
  font-size: 15px;
  overflow: hidden;
  transition:
    theme.$transitions,
    height 0.25s,
    padding 0.25s,
    border-bottom 0.25s;

  @include theme.mobile {
    padding: 5px 15px;
  }

  &.hide {
    height: 0;
    padding: 0 25px;
    border-bottom: 0 solid theme.$border;
  }

  & > div {
    transition:
      theme.$transitions,
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
      color: theme.$text300;
      text-decoration: none;

      & > .type {
        height: 18px;
        width: 18px;
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
      color: theme.$green;
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

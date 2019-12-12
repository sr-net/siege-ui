<template>
  <div class="buttons-container">
    <button class="team-button" :disabled="loading" @click="setTeam('atk')">ATK</button>

    <button class="team-button" :disabled="loading" @click="setTeam('def')">DEF</button>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    setTeam: {
      type: Function,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
@import '../variables';

.buttons-container {
  flex-shrink: 0;
  display: flex;
  width: 100%;

  & > .team-button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;

    background: $button;
    color: $text300;
    font-family: 'Catamaran', Impact, sans-serif;
    font-size: 40px;
    font-weight: 800;
    border: 0;
    line-height: 100%;

    cursor: pointer;

    transition: background 0.25s;

    @include mobile {
      font-size: 35px;
    }

    &:first-child {
      border-right: 1px solid $border;
    }

    &:last-child {
      border-left: 1px solid $border;
    }

    &:disabled {
      pointer-events: none;
      cursor: default;
    }

    &:hover {
      background: $buttonHover;
    }

    &:active {
      background: $buttonClick;
    }
  }
}
</style>

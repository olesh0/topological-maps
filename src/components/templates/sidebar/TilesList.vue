<template>
  <div class="path-tool">
    <h4>Tiles list</h4>

    <div class="points">
      <div
        v-for="(tile) in tiles"
        v-bind:key="`tile-${tile.name}`"
        class="point tile"
        :class="{
          selected: tile.name === selectedTile.name,
        }"
        @click="setTile(tile)"
      >
        {{tile.name}}
      </div>
    </div>
  </div>
</template>

<script>
import Tiles from '@/assets/tiles.json'
import store from '@/store'

export default {
  computed: {
    selectedTile() {
      return store.getters['map/tile']
    },
    tiles() {
      return Tiles
    },
  },
  methods: {
    setTile(tile) {
      store.commit('map/setTile', tile)
    },
  },
}
</script>

<style lang="less" scoped>
@import "./common.less";

.tile {
  cursor: pointer;

  &.selected {
    border-color: var(--color-accent-green) !important;
    background: var(--color-accent-green-highlight) !important;
  }
}
</style>

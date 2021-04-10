<template>
  <div class="path-tool">
    <div
      v-if="selectedPath === null"
      class="paths-list"
    >
      <div
        class="path"
        v-for="(path, index) in paths"
        v-bind:key="`idx-path-${index}`"
        @click="selectedPath = index"
      >
        Some path name {{index}}
      </div>
    </div>

    <div v-if="selectedPath !== null">
      <app-back-button @click="selectedPath = null">Back to all paths...</app-back-button>

      <h3>Path name...</h3>
      <h4>Path points ({{points.length}})</h4>

      <div class="points">
        <div
          v-for="(point, index) in points"
          v-bind:key="`idx-point-${index}`"
          class="point"
        >
          <div class="info">
            48.498371, 25.114022
          </div>

          <div class="actions">
            <button>Remove</button>
          </div>
        </div>
      </div>

      <div
        v-if="info.length"
        class="path-info"
      >
        <h4>Path info</h4>

        <div class="info-list">
          <div
            v-for="(item) in info"
            v-bind:key="item.label"
            class="info-item"
          >
            <div class="label">{{item.label}}</div>
            <div class="value">{{item.value}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/ui/AppBackButton.vue'

export default {
  computed: {
    info() {
      return [
        { label: 'Average line length', value: '1.1km' },
        { label: 'Points', value: this.points.length },
        { label: 'Path length', value: '13km' },
      ]
    },
  },
  data() {
    return {
      selectedPath: null,
      paths: [1, 2, 3, 4],
      points: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  },
  components: {
    AppBackButton,
  },
}
</script>

<style lang="less" scoped>
@import "./common.less";
</style>

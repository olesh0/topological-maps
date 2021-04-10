<template>
  <div class="path-tool">
    <div
      v-if="selectedDistance === null"
      class="paths-list"
    >
      <div
        class="path"
        v-for="(path, index) in paths"
        v-bind:key="`idx-path-${index}`"
        @click="selectedDistance = index"
      >
        Some measured distance's name {{index}}
      </div>
    </div>

    <div v-if="selectedDistance !== null">
      <app-back-button @click="selectedDistance = null">Back to all distances...</app-back-button>

      <h3>Distance's name...</h3>
      <h4>Points</h4>

      <div class="points">
        <div
          v-for="(fieldKey, index) in Object.keys(points)"
          v-bind:key="`idx-point-${index}-${fieldKey}`"
          class="point"
        >
          <div class="info">
            {{points[fieldKey].label}}: 48.498371, 25.114022
          </div>

          <div class="actions">
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/ui/AppBackButton.vue'

export default {
  data() {
    return {
      selectedDistance: null,
      paths: [1, 2, 3, 4],
      points: {
        entry: {
          label: 'Starting point',
        },
        finish: {
          label: 'Finish point',
        },
      },
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

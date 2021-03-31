<template>
  <div id="sidebar">
    <div class="menu">
      <div
        v-for="(tool) in menu"
        v-bind:key="tool.key"
        @click="selectedToolKey = tool.key"
        class="menu-item"
        :class="{ 'selected-tool': tool.key === selectedToolKey }"
      >
        <div class="icon"></div>

        <div class="label">
          {{tool.label}}
        </div>
      </div>
    </div>

    <div class="components">
      <PathTool v-if="selectedToolKey === 'PATH_TOOL'" />
      <CircleTool v-if="selectedToolKey === 'CIRCLE_TOOL'" />
      <DistanceTool v-if="selectedToolKey === 'DISTANCE_TOOL'" />
      <BearingTool v-if="selectedToolKey === 'BEARING_TOOL'" />
    </div>
  </div>
</template>

<script>
import PathTool from '@/components/templates/sidebar/PathTool.vue'
import CircleTool from '@/components/templates/sidebar/CircleTool.vue'
import DistanceTool from '@/components/templates/sidebar/DistanceTool.vue'
import BearingTool from '@/components/templates/sidebar/BearingTool.vue'

export default {
  computed: {
    selectedTool() {
      return this.menu.find(({ key }) => this.selectedToolKey === key)
    },
  },
  data() {
    return {
      menu: [
        { label: 'Move tool', key: 'MOVE_TOOL' },
        { label: 'Bearing tool', key: 'BEARING_TOOL' },
        { label: 'Map download tool', key: 'MAP_DOWNLOAD_TOOL' },
        { label: 'Path tool', key: 'PATH_TOOL' },
        { label: 'Circle tool', key: 'CIRCLE_TOOL' },
        { label: 'Distance tool', key: 'DISTANCE_TOOL' },
      ],
      selectedToolKey: null,
    }
  },
  components: {
    PathTool,
    CircleTool,
    DistanceTool,
    BearingTool,
  },
}
</script>

<style lang="less" scoped>
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 410;

  width: 250px;
  height: 100vh;
  overflow: auto;

  background: var(--color-bg-dark);

  color: var(--color-font-main);
  text-align: center;

  .menu {
    text-align: left;

    .menu-item {
      display: grid;
      grid-template-columns: 20px 1fr;
      grid-gap: 10px;
      cursor: pointer;

      padding: 15px 20px;
      color: var(--color-font-dark);
      border-left: 5px solid transparent;

      &.selected-tool {
        color: var(--color-accent-red);
        background: var(--color-accent-red-highlight);
        border-left-color: var(--color-accent-red);
      }
    }
  }

  .components {
    margin-top: 10px;
    padding: 10px;
    border-top: 1px solid var(--color-border-light);
  }
}
</style>

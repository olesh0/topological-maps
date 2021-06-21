<template>
  <div id="sidebar">
    <div class="menu">
      <div
        v-for="(tool) in menu"
        v-bind:key="tool.key"
        @click="handleToolClick(tool)"
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
      <DownloadTool v-if="selectedToolKey === 'DOWNLOAD_TOOL'" />
      <TilesList v-if="selectedToolKey === 'TILES_LIST'" />
    </div>

    <CalculatorTool
      :show="showCalculatorTool"
      @close="showCalculatorTool = false"
    />
  </div>
</template>

<script>
import PathTool from '@/components/templates/sidebar/PathTool.vue'
import CircleTool from '@/components/templates/sidebar/CircleTool.vue'
import DistanceTool from '@/components/templates/sidebar/DistanceTool.vue'
import BearingTool from '@/components/templates/sidebar/BearingTool.vue'
import DownloadTool from '@/components/templates/sidebar/DownloadTool.vue'
import TilesList from '@/components/templates/sidebar/TilesList.vue'
import CalculatorTool from '@/components/templates/sidebar/CalculatorTool.vue'

export default {
  computed: {
    selectedTool() {
      return this.menu.find(({ key }) => this.selectedToolKey === key)
    },
  },
  methods: {
    handleToolClick(tool) {
      if (tool.onClick) tool.onClick(tool)

      this.selectedToolKey = tool.key
    },
  },
  data() {
    return {
      showCalculatorTool: false,
      menu: [
        { label: 'Move tool', key: 'MOVE_TOOL' },
        { label: 'Bearing tool', key: 'BEARING_TOOL' },
        { label: 'Map download tool', key: 'DOWNLOAD_TOOL' },
        { label: 'Path tool', key: 'PATH_TOOL' },
        { label: 'Circle tool', key: 'CIRCLE_TOOL' },
        { label: 'Distance tool', key: 'DISTANCE_TOOL' },
        { label: 'Tiles list', key: 'TILES_LIST' },
        {
          label: 'Calculator',
          key: 'CALCULATR_TOOL',
          onClick: () => {
            this.showCalculatorTool = true
          },
        },
      ],
      selectedToolKey: null,
    }
  },
  components: {
    PathTool,
    CircleTool,
    DistanceTool,
    BearingTool,
    DownloadTool,
    CalculatorTool,
    TilesList,
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

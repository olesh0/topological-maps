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
.path-tool {
  text-align: left;

  .paths-list {
    .path {
      margin-bottom: 5px;
      padding: 10px;
      background: var(--color-accent-red-highlight);
      border-left: 5px solid var(--color-accent-red);

      cursor: pointer;
    }
  }

  h4 {
    font-weight: 300;
    color: var(--color-font-dark);
    margin: 0;
    padding: 0;
  }

  .points {
    margin: 10px 0;
    max-height: 300px;
    overflow: auto;

    .point {
      align-items: center;
      position: relative;
      overflow: hidden;

      background: var(--color-accent-red-highlight);
      border-left: 5px solid var(--color-accent-red);
      padding: 10px;
      margin-bottom: 5px;

      .info {
        transition: all 300ms;
      }

      &:hover {
        .actions {
          right: 0%;
        }

        .info {
          opacity: .1;
        }
      }

      .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        position: absolute;
        top: 0;
        bottom: 0;
        right: -100%;

        width: 100%;
        padding: 0 10px;

        background: linear-gradient(-90deg, var(--color-accent-red-highlight), transparent);

        margin: auto;
        transition: all 300ms;

        button {
          background: transparent;
          font-size: .9rem;
          cursor: pointer;
          border: 0;
          color: var(--color-font-main);

          font-weight: 100;
          font-family: Avenir;
        }
      }
    }
  }

  .path-info {
    margin-top: 15px;

    .info-list {
      margin-top: 5px;

      .info-item {
        margin-bottom: 3px;
        display: flex;
        justify-content: space-between;

        .label {
          color: var(--color-font-dark);
          font-weight: 100;
        }

        .value {
          color: var(--color-accent-green);
          font-weight: 300;
        }
      }
    }
  }
}
</style>

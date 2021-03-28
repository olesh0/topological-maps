<template>
  <div class="circle-tool">
    <div
      v-if="selectedCircle === null"
      class="circles-list"
    >
      <div
        class="circle"
        v-for="(circle, index) in circles"
        v-bind:key="`idx-circle-${index}`"
        @click="selectedCircle = index"
      >
        Some circle's name {{index}}
      </div>
    </div>

    <div v-if="selectedCircle !== null">
      <app-back-button @click="selectedCircle = null">Back to all circles...</app-back-button>

      <h3>Circle's name...</h3>

      <div class="circle-center">
        <div class="label">Circle's center</div>
        <div class="value">48.606809, 25.129509</div>
      </div>

      <div class="circle-center">
        <div class="label">Radius</div>
        <div class="value">15km</div>
      </div>

      <div
        v-if="info.length"
        class="circle-info"
      >
        <h4>Circle info</h4>

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
        { label: 'Circle radius', value: '13km' },
      ]
    },
  },
  data() {
    return {
      selectedCircle: null,
      circles: [1, 2, 3, 4],
    }
  },
  components: {
    AppBackButton,
  },
}
</script>

<style lang="less" scoped>
.circle-tool {
  text-align: left;

  .circles-list {
    .circle {
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

  h3 {
    margin: 0;
    padding: 0;
    font-weight: 200;
  }

  .circle-center {
    margin: 10px 0;

    .label {
      color: var(--color-font-dark);
    }

    .value {
      padding: 10px;
      background: var(--color-accent-green-highlight);
      color: var(--color-accent-green);
      border-left: 5px solid var(--color-accent-green);

      cursor: pointer;
    }
  }

  .circle-info {
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

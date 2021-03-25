<template>
  <div>
    <canvas ref="canvas"></canvas>

    <div id="draggable" ref="draggable">
      <div
        v-for="(y, rowIndex) in rowsToRenderComputed"
        v-bind:key="rowIndex"
        class="row"
      >
        <div
          v-for="(x, colIndex) in colsToRenderComputed"
          v-bind:key="colIndex"
          class="square"
        >
          <img
            :src="getFraction({
              x,
              y,
              z: scale,
            })"
            :data-image="`image-${x}-${y}-${scale}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'draggable'

const globalMercator = require('global-mercator')

export default {
  methods: {
    getFraction({ x, y, z }) {
      return `https://a.tile.opentopomap.org/${z}/${x}/${y}.png`
    },
    generateImageMap() {
      const { canvas } = this.$refs

      canvas.width = 256 * this.colsToRender
      canvas.height = 256 * this.rowsToRender

      const ctx = canvas.getContext('2d')

      let imagesLoaded = 0

      this.rowsToRenderComputed.forEach((y, rowIndex) => {
        this.colsToRenderComputed.forEach((x, colIndex) => {
          const imageUrl = this.getFraction({ x, y, z: this.scale })
          const image = new Image()

          image.src = imageUrl

          image.onload = () => {
            imagesLoaded += 1

            if (imagesLoaded === this.colsToRender * this.rowsToRender) {
              console.log('everything is loaded')
            }

            ctx.drawImage(image, 256 * colIndex, 256 * rowIndex, 256, 256)
          }
        })
      })
    },
  },
  computed: {
    colsToRenderComputed() {
      const cols = []

      for (let i = 0; i < this.colsToRender; i += 1) {
        cols.push(1)
      }

      const [locationX] = this.locationInfo

      return cols.map((_, colIndex) => locationX + Math.floor(colIndex - (this.colsToRender / 2)))
    },
    rowsToRenderComputed() {
      const rows = []

      for (let i = 0; i < this.rowsToRender; i += 1) {
        rows.push(1)
      }

      const [, locationY] = this.locationInfo

      return rows.map((_, colIndex) => locationY + Math.floor(colIndex - (this.rowsToRender / 2)))
    },
  },
  data() {
    return {
      location: {
        lat: 48.522039,
        lon: 25.036867,
      },
      canAddMore: true,
      scale: 15,
      rowsToRender: 35,
      colsToRender: 35,
      locationInfo: [0, 0, 0],
    }
  },
  created() {
    const { lon, lat } = this.location
    const { scale } = this

    const tile = [lon, lat]

    this.locationInfo = globalMercator.pointToTile(tile, scale)
  },
  mounted() {
    const { draggable } = this.$refs

    // this.generateImageMap()

    draggable.style.width = 'auto'

    const options = {
      onDrag: (_, x, y) => {
        /* eslint-disable no-param-reassign */
        _.style.width = 'auto'

        if (!this.canAddMore) return

        if (x > 0 || x < _.clientWidth) {
          this.colsToRender += 1
          this.canAddMore = false

          setTimeout(() => {
            this.canAddMore = true
          }, 500)
        }

        if (y > 0 || y < _.clientHeight) {
          if (!this.canAddMore) return

          this.rowsToRender += 1
          this.canAddMore = false

          setTimeout(() => {
            this.canAddMore = true
          }, 500)
        }
      },
      limit: (x, y) => ({ x, y }),
    }

    const draggableInstance = new Draggable(draggable, options)

    console.log(draggableInstance)
  },
}
</script>

<style lang="less">
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #333;
}

.square {
  width: 256px;
  height: 256px;
  overflow: hidden;
  display: inline-block;
}

#draggable {
  background: #333;
  width: auto;
}

img {
  display: inline;
  margin: 0;
  padding: 0;
  vertical-align: middle;
}

.row {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}

img {
  border: 1px solid #CCC;
  transition: all .3s;
}

img:hover {
  opacity: 0.5;
}
</style>

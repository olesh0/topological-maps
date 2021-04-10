<template>
  <div class="path-tool">
    <div
      v-if="selectedBearing === null"
      class="paths-list"
    >
      <div
        class="path"
        v-for="(bearing, index) in bearings"
        v-bind:key="`idx-path-${index}`"
        @click="selectedBearing = index"
      >
        {{bearing.name}}
      </div>

      <div
        class="path"
        @click="createBearing"
      >
        + Create new...
      </div>
    </div>

    <div v-if="selectedBearing !== null">
      <pre>
        {{bearingData}}
      </pre>

      <app-back-button @click="selectedBearing = null">Back to all bearings...</app-back-button>

      <h3>Bearing's name...</h3>
      <h4>Points</h4>

      <div class="points">
        <div
          v-for="(point, index) in bearings[selectedBearing].points"
          v-bind:key="`idx-point-${index}-${fieldKey}`"
          class="point"
        >
          <app-coords-point
            @onSet="(coords) => setCoords(coords, index)"
          >
            <div class="info">
              {{point.label}}: {{formatCoords(point.value)}}
            </div>
          </app-coords-point>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import L from 'leaflet'
import * as geolib from 'geolib'

import AppBackButton from '@/components/ui/AppBackButton.vue'
import AppCoordsPoint from '@/components/ui/AppCoordsPoint.vue'

export default {
  data() {
    return {
      selectedBearing: null,
      bearings: [],
    }
  },
  computed: {
    ...mapGetters({
      map: 'map/map',
    }),
    bearingData() {
      const data = {}
      const currentBearing = this.bearings[this.selectedBearing]
      const [startPoint, endPoint] = currentBearing.points
      const isFullFilled = startPoint.value.lat && endPoint.value.lng

      console.log(startPoint, endPoint, isFullFilled)

      if (isFullFilled) {
        data.bearing = geolib.getRhumbLineBearing(startPoint.value, endPoint.value)
        data.distance = geolib.getDistance(startPoint.value, endPoint.value)
      }

      return data
    },
  },
  methods: {
    setCoords(coords = {}, index) {
      const { selectedBearing } = this

      this.bearings[selectedBearing].points[index].value = coords

      const [startPoint, endPoint] = this.bearings[selectedBearing].points
      const currentLine = this.bearings[selectedBearing].line

      if (currentLine) {
        this.map.removeLayer(currentLine)
      }

      if (startPoint.value.lat && endPoint.value.lat) {
        const line = L.polyline([startPoint.value, endPoint.value], { color: '#d6392e' }).addTo(this.map)
        this.map.fitBounds(line.getBounds())

        this.bearings[selectedBearing].line = line
      }
    },
    formatCoords(coords) {
      const { lat, lng } = coords || {}

      if (!lat || !lng) {
        return '-, -'
      }

      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    },
    createBearing() {
      this.bearings.push({
        name: `New bearing ${this.bearings.length}`,
        line: null,
        points: [
          {
            label: 'Starting point',
            value: {},
          },
          {
            label: 'Finish point',
            value: {},
          },
        ],
      })
    },
  },
  components: {
    AppBackButton,
    AppCoordsPoint,
  },
}
</script>

<style lang="less" scoped>
@import "./common.less";
</style>

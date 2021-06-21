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

      <div
        class="info-list"
        v-if="bearingData.distance"
      >
        <div class="info-item">
          <div class="label">Distance</div>
          <div class="value">{{(bearingData.distance / 1000).toFixed(2)}}km</div>
        </div>

        <div class="info-item">
          <div class="label">Bearing</div>
          <div class="value">{{computeBearingInfo(bearingData.bearing)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import L from 'leaflet'
import * as geolib from 'geolib'

import store from '@/store'

import AppBackButton from '@/components/ui/AppBackButton.vue'
import AppCoordsPoint from '@/components/ui/AppCoordsPoint.vue'

export default {
  data() {
    return {
      selectedBearing: null,
      pointerPosition: {},
    }
  },
  mounted() {
    console.log(store)
    store.dispatch('map/addMapListener', {
      eventName: 'mousemove',
      callback: (event) => {
        this.pointerPosition = event.latlng
        console.log('setting location...', event.latlng)
      },
    })
  },
  computed: {
    ...mapGetters({
      map: 'map/map',
      bearings: 'map/bearings',
    }),
    bearingData() {
      const data = {}
      const currentBearing = this.bearings[this.selectedBearing]
      const [startPoint, endPoint] = currentBearing.points
      const isFullFilled = Boolean(
        startPoint.value.lat && (endPoint.value.lng || this.pointerPosition.lng),
      )

      console.log({
        startPoint,
        endPoint,
        pointer: this.pointerPosition,
        isFullFilled,
      })

      if (isFullFilled) {
        const endPointInstance = endPoint.value.lat ? endPoint.value : this.pointerPosition

        console.log({ endPointInstance }, endPointInstance.lat)

        data.bearing = geolib.getRhumbLineBearing(
          startPoint.value,
          endPointInstance,
        )

        data.distance = geolib.getDistance(
          startPoint.value,
          endPointInstance,
        )
      }

      console.log(data)

      return data
    },
  },
  methods: {
    computeBearingInfo(bearing) {
      const reverseBearing = bearing > 180 ? bearing - 180 : bearing + 180

      const actualBearing = `${bearing.toFixed(1)}°`
      const reverseBearingString = `${reverseBearing.toFixed(1)}°`

      return `${actualBearing} / ${reverseBearingString}`
    },
    setCoords(coords = {}, index) {
      const { selectedBearing } = this
      const { bearings } = this

      bearings[selectedBearing].points[index].value = coords

      store.commit('map/setBearings', bearings)

      const [startPoint, endPoint] = this.bearings[selectedBearing].points
      const currentLine = this.bearings[selectedBearing].line

      if (currentLine) {
        this.map.removeLayer(currentLine)
        bearings[selectedBearing].line = null

        store.commit('map/setBearings', bearings)
      }

      if (startPoint.value.lat && endPoint.value.lat) {
        const line = L.polyline([startPoint.value, endPoint.value], { color: '#d6392e' }).addTo(this.map)
        // this.map.fitBounds(line.getBounds())

        bearings[selectedBearing].line = line
        store.commit('map/setBearings', bearings)
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

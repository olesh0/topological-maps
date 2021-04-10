<template>
  <div class="path-tool">
    <div class="map-information">
      <div><span>Latitude:</span> {{mapLocation.lat.toFixed(6)}}</div>
      <div><span>Longitude:</span> {{mapLocation.lng.toFixed(6)}}</div>
    </div>

    <div class="map-information">
      <div><span>Width:</span> {{(size.width / 1000).toFixed(2)}}km</div>
      <div><span>Height:</span> {{(size.height / 1000).toFixed(2)}}km</div>
    </div>

    <button
      @click="downloadCurrentView"
      :class="{ isDownloading }"
    >Download current view</button>
  </div>
</template>

<script>
import leafletImage from 'leaflet-image'
import * as geolib from 'geolib'

import store from '@/store'

export default {
  methods: {
    downloadCurrentView() {
      const map = store.getters['map/map']

      if (this.isDownloading) return

      this.isDownloading = true

      console.log('preparing to download...')

      leafletImage(map, (_, canvas) => {
        console.log('ready for download...')

        const a = document.createElement('a')

        a.style.display = 'none'
        a.href = canvas.toDataURL()

        a.download = 'todo-1.png'
        document.body.appendChild(a)
        a.click()

        this.isDownloading = false
        console.log('done.')
      })
    },
  },
  created() {
    store.dispatch('map/addMapListener', {
      eventName: 'move',
      callback: () => {
        const map = store.getters['map/map']

        this.mapLocation = map.getCenter()

        const bounds = map.getBounds()

        const { _northEast, _southWest } = bounds

        const topRightPoint = { latitude: _northEast.lat, longitude: _northEast.lng }
        const topLeftPoint = { latitude: _southWest.lat, longitude: _northEast.lng }

        const bottomRightPoint = { latitude: _northEast.lat, longitude: _southWest.lng }
        const bottomLeftPoint = { latitude: _southWest.lat, longitude: _southWest.lng }

        this.size = {
          width: geolib.getDistance(bottomLeftPoint, bottomRightPoint),
          height: geolib.getDistance(topLeftPoint, topRightPoint),
        }
      },
    })
  },
  data() {
    return {
      isDownloading: false,
      mapLocation: {
        lat: 0,
        lng: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
    }
  },
}
</script>

<style lang="less" scoped>
@import "./common.less";

.map-information {
  margin-bottom: 10px;

  div {
    color: var(--color-accent-green);

    span {
      color: var(--color-font-dark);
    }
  }
}

button {
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  background: var(--color-bg-light);
  color: var(--color-accent-green);
  border: 0;

  &.isDownloading {
    opacity: .5;
    cursor: default;
  }
}
</style>

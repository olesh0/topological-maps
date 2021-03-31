<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import store from '@/store'

export default {
  mounted() {
    const map = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      preferCanvas: true,
    }).setView([48.5233871949739, 25.04222706978908], 12)

    L.tileLayer('https://b.tile.opentopomap.org/{z}/{x}/{y}.png').addTo(map)

    store.commit('map/setMap', map)
  },
}
</script>

<style lang="less">
#map {
  width: 100vw;
  height: 100vh;
}
</style>

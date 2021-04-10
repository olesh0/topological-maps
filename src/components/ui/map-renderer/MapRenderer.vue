<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import Tiles from '@/assets/tiles.json'
import store from '@/store'

export default {
  computed: {
    tile() {
      return store.getters['map/tile']
    },
  },
  data() {
    return {
      map: null,
    }
  },
  watch: {
    tile(updatedTile) {
      const { map } = this
      const newTile = L.tileLayer(updatedTile.url)

      map.addLayer(newTile)

      setTimeout(() => {
        map.eachLayer((layer) => {
          const url = layer._url
          const DO_NOT_TOUCH_TILES = [Tiles[0].url, updatedTile.url]

          // removing tiles not touching base tile
          // workaround an issue with base layer...
          if (!DO_NOT_TOUCH_TILES.includes(url)) {
            map.removeLayer(layer)
          }
        })
      }, 500)
    },
  },
  mounted() {
    const map = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      preferCanvas: true,
    }).setView([48.5233871949739, 25.04222706978908], 12)

    const tile = L.tileLayer(this.tile.url)

    map.addLayer(tile)
    store.commit('map/setMap', map)

    this.map = map
  },
}
</script>

<style lang="less">
.leaflet-container {
  background: #000;
}

#map {
  width: 100vw;
  height: 100vh;
}
</style>

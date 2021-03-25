<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  mounted() {
    const map = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      preferCanvas: true,
    }).setView(
      [
        48.5233871949739,
        25.04222706978908,
      ],
      12,
    )

    L.tileLayer('https://b.tile.opentopomap.org/{z}/{x}/{y}.png', {
      tileSize: 256,
      inertia: false,
    }).addTo(map)

    const points = []
    let mapPolygon = null

    map.on('click', (event) => {
      points.push(event.latlng)

      if (points.length >= 3) {
        if (mapPolygon) {
          map.removeLayer(mapPolygon)
        }

        mapPolygon = L.polygon(points, {
          color: 'red',
          fillColor: '#f00',
          fillOpacity: 0.5,
        }).addTo(map)
      }

      console.log(event.latlng)
    })
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 100vw;
  height: 100vh;
}

#map {
  width: 100vw;
  height: 100vh;
}
</style>

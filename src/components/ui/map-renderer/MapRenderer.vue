<template>
  <div id="map"></div>
</template>

<script>
import L from 'leaflet'
import leafletImage from 'leaflet-image'
import 'leaflet/dist/leaflet.css'

// import store from '@/store'

export default {
  mounted() {
    const map = L.map('map', {
      attributionControl: false,
      zoomControl: false,
      preferCanvas: true,
    }).setView([48.5233871949739, 25.04222706978908], 12)

    // map.on('mousemove', (e) => {
    //   console.log(e.latlng)

    //   store.commit('map/setCursorPosition', e.latlng)
    // })

    L.tileLayer('https://b.tile.opentopomap.org/{z}/{x}/{y}.png').addTo(map)

    // const points = []
    // let mapPolygon = null
    // let mapPath = null

    map.on('click', () => {
      leafletImage(map, (_, canvas) => {
        // now you have canvas
        // example thing to do with that canvas:
        // const img = document.createElement('img')
        // const dimensions = map.getSize()

        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = canvas.toDataURL()

        a.download = 'todo-1.png'
        document.body.appendChild(a)
        a.click()
        global.alert('your file has downloaded!')
      })

      // if (points.length >= 3) {
      //   if (mapPolygon) {
      //     map.removeLayer(mapPolygon)
      //   }

      //   mapPolygon = L.polygon(points, {
      //     color: 'red',
      //     fillColor: '#f00',
      //     fillOpacity: 0.5,
      //   }).addTo(map)
      // }

      // console.log(points)

      // if (points.length >= 2) {
      //   if (mapPath) {
      //     map.removeLayer(mapPath)
      //   }

      //   mapPath = L.polyline(points, { color: '#f44' }).addTo(map)
      //   mapPath.on('click', () => console.log('why did you do that?'))
      // }

      // console.log(event.latlng)
    })
  },
}
</script>

<style lang="less">
#map {
  width: 100vw;
  height: 100vh;
}
</style>

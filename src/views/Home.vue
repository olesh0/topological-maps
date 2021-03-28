<template>
  <div class="home">
    <Sidebar />
    <Topbar />

    <map-renderer />
  </div>
</template>

<script>
import MapRenderer from '@/components/ui/map-renderer/MapRenderer.vue'
import Sidebar from '@/components/ui/map-renderer/Sidebar.vue'
import Topbar from '@/components/ui/map-renderer/Topbar.vue'

export default {
  name: 'Home',
  components: {
    MapRenderer,
    Sidebar,
    Topbar,
  },
}
</script>

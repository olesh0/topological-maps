<template>
  <div id="topbar">
    <div class="cursor-position">
      <span>Lat: <b>{{cursor.lat.toFixed(6)}}</b></span>
      <span>Lon: <b>{{cursor.lng.toFixed(6)}}</b></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cursor: 'map/cursorPosition',
    }),
  },
}
</script>

<style lang="less" scoped>
#topbar {
  display: grid;
  grid-template-columns: auto;

  width: calc(100vw - 250px);
  padding: 10px;

  position: fixed;
  top: 0;
  left: 250px;

  background: var(--color-bg-dark);
  z-index: 405;

  color: #fff;

  text-align: right;

  .cursor-position {
    color: var(--color-font-light);
    transition: all .3s;
    text-transform: uppercase;

    &:hover {
      color: var(--color-font-main);
    }

    b {
      color: var(--color-accent-green);
    }

    span {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>

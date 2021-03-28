<template>
  <div id="topbar">
    <div class="cursor-position">
      <span>Lat: {{cursor.lat.toFixed(6)}}</span>
      <span>Lon: {{cursor.lng.toFixed(6)}}</span>
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

  width: calc(100vw - 4vw);
  padding: 10px;

  position: fixed;
  top: 0;
  left: 4vw;

  background: var(--color-bg-dark);
  z-index: 410;

  color: #fff;

  text-align: right;

  .cursor-position {
    margin-right: 20px;
    color: var(--color-font-light);
    transition: all .3s;

    &:hover {
      color: var(--color-font-main);
    }

    span {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>

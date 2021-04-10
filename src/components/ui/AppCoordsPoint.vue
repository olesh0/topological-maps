<template>
  <div @click="handleWrapperClick">
    <div
      v-if="isEditing"
      class="editing-label"
    >
      <Preloader />
      <div class="label">Click on map to select coords...</div>
    </div>

    <span v-else>
      <slot />
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Preloader from '@/components/ui/Preloader.vue'

let somethingIsListening = false

export default {
  data() {
    return {
      isEditing: false,
    }
  },
  methods: {
    ...mapActions({
      addMapListener: 'map/addMapListener',
    }),
    async handleWrapperClick() {
      if (somethingIsListening) return

      this.isEditing = true
      somethingIsListening = true

      this.$emit('onSet', {})

      const { cleanup } = await this.addMapListener({
        eventName: 'click',
        cleanupAfterEmit: true,
        callback: (data) => {
          cleanup()
          this.$emit('onSet', data.latlng)

          this.isEditing = false
          somethingIsListening = false
        },
      })
    },
  },
  components: {
    Preloader,
  },
}
</script>

<style lang="less" scoped>
div {
  cursor: pointer;

  .editing-label {
    display: flex;
    align-items: center;

    .label {
      margin-left: 10px;
    }
  }
}
</style>

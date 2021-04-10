<template>
  <button @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
button {
  background: transparent;
  border: 0;
  padding: 0;
  margin-bottom: 10px;

  color: var(--color-accent-red);
  cursor: pointer;
}
</style>

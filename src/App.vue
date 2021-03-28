<template>
  <router-view />
</template>

<script>
export default {}
</script>

<style lang="less">
:root {
  --color-bg-dark: #242729;
  --color-bg-main: #17191A;
  --color-bg-light: #323639;

  --color-font-main: #EEE;
  --color-font-dark: #5D6B75;
  --color-font-light: #7A8B98;

  --color-accent-red: #D6392E;
  --color-accent-green: #25C9A3;
  --color-accent-blue: #3447D9;
  --color-accent-orange: #E2C424;
}

body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;

  font: 1rem Avenir, 'PT Sans';
  background: var(--color-bg-main);
}
</style>

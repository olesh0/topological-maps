<template>
  <router-view />
</template>

<script>
export default {}
</script>

<style lang="less">
* {
  box-sizing: border-box;
  outline: none;
}

:root {
  @color-accent-red: #D6392E;
  @color-accent-green: #25C9A3;
  @color-accent-blue: #3447D9;
  @color-accent-orange: #E2C424;

  --color-bg-dark: #242729;
  --color-bg-main: #17191A;
  --color-bg-light: #323639;

  --color-border-light: #323639;

  --color-font-main: #EEE;
  --color-font-dark: #5D6B75;
  --color-font-light: #7A8B98;

  --color-accent-red: @color-accent-red;
  --color-accent-green: @color-accent-green;
  --color-accent-blue: @color-accent-blue;
  --color-accent-orange: @color-accent-orange;

  --color-accent-red-highlight: fadeout(@color-accent-red, 70%);
  --color-accent-green-highlight: fadeout(@color-accent-green, 70%);
  --color-accent-blue-highlight: fadeout(@color-accent-blue, 70%);
  --color-accent-orange-highlight: fadeout(@color-accent-orange, 70%);
}

body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;

  background: var(--color-bg-main);
}

button, input, body {
  font: 1rem Avenir, 'PT Sans';
}
</style>

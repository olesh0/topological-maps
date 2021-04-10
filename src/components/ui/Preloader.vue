<template>
  <div class="preloader">
    <div
      :class="`line line${index + 1}`"
      v-for="(_, index) in [1, 2, 3]"
      v-bind:key="`idx-preloader-line-${index}`"
    ></div>
  </div>
</template>

<style lang="less">
@keyframes preloaderAnimation {
  0%, 100% {
    height: 15px;
  }

  50% {
    height: 5px;
  }
}

.preloader {
  display: flex;
  align-items: center;

  .line {
    width: 3px;
    height: 15px;
    background: var(--color-accent-red);
    border-radius: 10px;

    margin: 0 2px;
  }

  .line:nth-of-type(odd) {
    animation: 800ms preloaderAnimation 400ms infinite;
  }

  .line:nth-of-type(even) {
    animation: 800ms preloaderAnimation infinite;
  }
}
</style>

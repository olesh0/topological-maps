<template>
  <div class="modal-window">
    <div class="modal-body">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.modal-window {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  z-index: 550;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, .6);

  overflow: auto;

  .modal-body {
    width: 60vw;
    height: 95vh;

    box-shadow: 0px 0px 15px rgba(0, 0, 0, .2);
    background: var(--color-bg-light);

    text-align: left;

    position: relative;
  }
}
</style>

<template>
  <div class="ol-app-loader-wrapper">
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.ol-app-loader-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: black;
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

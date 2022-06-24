<template>
    <div :title="'loading'" class="shimmer">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'LoadingShimmer',
}
</script>
<style lang="scss">
.shimmer {
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(219, 219, 219);
}
.shimmer::before {
  content: '';
  position: absolute;
  background: linear-gradient(
  90deg,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.4) 50%,
  rgba(255,255,255,0) 100%
  );
  height: 100%;
  width: 100%;
  z-index: 1;
  animation: shimmer 1s infinite;
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
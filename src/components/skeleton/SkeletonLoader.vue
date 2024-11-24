<template>
  <div
    class="skeleton"
    :style="{
      width: width,
      height: height,
      borderRadius: rounded ? '4px' : '0',
    }"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: boolean
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '20px',
  rounded: false,
})
</script>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(226, 226, 226, 0.2) 25%,
    rgba(190, 190, 190, 0.24) 37%,
    rgba(226, 226, 226, 0.2) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>

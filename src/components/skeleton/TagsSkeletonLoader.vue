<template>
  <div class="border rounded py-2 mb-4" style="max-height: 400px; overflow-y: auto">
    <div v-for="n in count" :key="n" class="form-check d-flex align-items-center gap-5 mb-2">
      <SkeletonLoader width="16px" height="20px" :rounded="true" />
      <SkeletonLoader :width="getRandomWidth()" height="20px" :rounded="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader.vue'

interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 6,
})

// Generate random widths for more natural looking skeleton
const getRandomWidth = () => {
  const widths = ['60px', '80px', '100px', '120px']
  return widths[Math.floor(Math.random() * widths.length)]
}
</script>

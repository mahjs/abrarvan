<template>
  <tr class="border-bottom">
    <td class="py-3">
      <SkeletonLoader width="30px" />
    </td>
    <td class="py-3">
      <SkeletonLoader width="120px" />
    </td>
    <td class="py-3">
      <SkeletonLoader width="100px" />
    </td>
    <td class="py-3">
      <SkeletonLoader width="150px" />
    </td>
    <td class="py-3">
      <SkeletonLoader width="200px" />
    </td>
    <td class="py-3 d-flex justify-content-between align-items-center">
      <SkeletonLoader width="100px" />
      <div class="d-flex gap-2">
        <SkeletonLoader width="32px" height="30px" :rounded="true" />
        <SkeletonLoader width="32px" height="30px" :rounded="true" />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader.vue'
</script>

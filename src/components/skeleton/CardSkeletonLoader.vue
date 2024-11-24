<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <!-- Title skeleton -->
        <SkeletonLoader width="70%" height="24px" :rounded="true" />
        <!-- Action buttons skeleton -->
        <div class="d-flex gap-2">
          <SkeletonLoader width="32px" height="32px" :rounded="true" />
          <SkeletonLoader width="32px" height="32px" :rounded="true" />
        </div>
      </div>
      <!-- Author skeleton -->
      <SkeletonLoader width="40%" height="18px" :rounded="true" class="mb-2" />
      <!-- Description skeleton - multiple lines -->
      <div class="mb-3">
        <SkeletonLoader width="100%" height="16px" :rounded="true" class="mb-2" />
        <SkeletonLoader width="90%" height="16px" :rounded="true" class="mb-2" />
        <SkeletonLoader width="60%" height="16px" :rounded="true" />
      </div>
      <!-- Date skeleton -->
      <SkeletonLoader width="30%" height="14px" :rounded="true" class="mb-2" />
      <!-- Tags skeleton -->
      <div class="d-flex gap-2">
        <SkeletonLoader v-for="n in 3" :key="n" width="60px" height="20px" :rounded="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonLoader from './SkeletonLoader.vue'
</script>

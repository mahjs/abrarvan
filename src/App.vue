<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <router-view />
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
}
</style>

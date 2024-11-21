<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRoute()
const authRoutes = ['/auth/login', '/auth/register']
const isAuthRoute = ref(authRoutes.includes(router.path))

watch(
  () => router.path,
  (newPath) => {
    isAuthRoute.value = authRoutes.includes(newPath)
  },
)
</script>

<template>
  <NavBar v-if="!isAuthRoute" />
  <main class="wrapper">
    <section v-if="!isAuthRoute" class="navbar bg-primary">
      <span class="text-white fs-2">Post</span>
      <nav>
        <RouterLink class="nav-link text-white" to="/">All Articles</RouterLink>
        <RouterLink class="nav-link text-white" to="/new-article">New Article</RouterLink>
      </nav>
    </section>
    <router-view />
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
}

.navbar {
  min-width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  span {
    font-size: x-large;
  }

  a {
    font-size: large;
  }
}
</style>

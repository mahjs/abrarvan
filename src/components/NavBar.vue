<template>
  <nav class="navbar-dark bg-dark px-2 px-sm-4">
    <div class="container-fluid py-2">
      <div class="d-flex flex-column flex-sm-row w-100 gap-2 gap-sm-0">
        <a class="navbar-brand fs-5 fs-sm-4" href="#">Arvan Challenge</a>
        <div
          class="d-flex flex-column flex-sm-row justify-content-between align-items-center w-100"
        >
          <span class="text-light mb-2 mb-sm-0 me-sm-3"> Welcome, {{ username }} </span>
          <button class="btn btn-outline-light btn-sm w-sm-auto" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const username = localStorage.getItem('username') || 'Guest'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  router.push('/auth/login')
}
</script>

<style scoped>
.navbar {
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 575.98px) {
  .navbar-brand {
    text-align: center;
    margin-bottom: 0.5rem;
  }
}
</style>

<template>
  <nav class="navbar-dark bg-dark px-4">
    <div class="d-flex py-2 container-fluid">
      <a class="navbar-brand" href="#">Arvan Challenge</a>
      <div class="w-100 d-flex justify-content-between align-items-center">
        <span class="text-light me-3">Welcome, {{ username }}</span>
        <button class="btn ml-auto btn-outline-light btn-sm" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Mock username, replace with the actual user data from your state or store.
const username = localStorage.getItem('username') || 'Guest'
const router = useRouter()

// Logout Function
const logout = () => {
  // Clear local storage and token
  localStorage.removeItem('token')
  localStorage.removeItem('username')

  // Redirect to login page
  router.push('/auth/login')
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

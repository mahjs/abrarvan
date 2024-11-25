<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue'

const isSidebarOpen = ref(false)

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  document.body.style.overflow = isSidebarOpen.value ? 'hidden' : ''
}

// Close sidebar
const closeSidebar = () => {
  isSidebarOpen.value = false
  document.body.style.overflow = ''
}

// Close sidebar on mobile when clicking a link
const closeSidebarOnMobile = () => {
  if (window.innerWidth < 768) {
    closeSidebar()
  }
}

// Close sidebar on window resize if screen becomes larger
const handleResize = () => {
  if (window.innerWidth >= 768 && isSidebarOpen.value) {
    closeSidebar()
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

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
    <div v-if="!isAuthRoute">
      <!-- Hamburger Menu Button for Mobile -->
      <button class="menu-toggle d-md-none" @click="toggleSidebar" :aria-expanded="isSidebarOpen">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <!-- Sidebar -->
      <section class="sidebar bg-primary" :class="{ open: isSidebarOpen }">
        <span class="text-white fs-2 mb-4">Post</span>
        <nav class="nav-links">
          <RouterLink class="nav-link text-white" to="/" @click="closeSidebarOnMobile">
            All Articles
          </RouterLink>
          <RouterLink class="nav-link text-white" to="/new-article" @click="closeSidebarOnMobile">
            New Article
          </RouterLink>
        </nav>
      </section>

      <!-- Backdrop for mobile -->
      <div
        class="sidebar-backdrop d-md-none"
        :class="{ show: isSidebarOpen }"
        @click="closeSidebar"
      ></div>
    </div>
    <router-view />
  </main>
</template>

<script setup lang="ts"></script>

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

.menu-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1040;
  background: transparent;
  border: none;
  padding: 10px;
}

.icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #0d6efd;
  margin: 4px 0;
  transition: all 0.3s;
}

.menu-toggle[aria-expanded='true'] .icon-bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle[aria-expanded='true'] .icon-bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle[aria-expanded='true'] .icon-bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;
  min-height: calc(100vh - 60px);
  top: 0;
  left: 0;
  width: 250px;
  transition: transform 0.3s ease-in-out;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  padding: 0.5rem 0;
  transition: opacity 0.2s;
}

.nav-link:hover {
  opacity: 0.8;
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1030;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
}

.sidebar-backdrop.show {
  opacity: 1;
  visibility: visible;
}

/* Mobile Styles */
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
    z-index: 1035;
    position: fixed;
    min-height: 100vh;
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

/* Desktop Styles */
@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .sidebar {
    transform: none;
  }

  :deep(main) {
    margin-left: 250px;
  }
}
</style>

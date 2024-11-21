<template>
  <div class="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
    <div class="card shadow-sm" style="width: 400px">
      <div class="card-body">
        <h2 class="text-center mb-4">Register</h2>
        <!-- Registration Form -->
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="user" class="form-label" :class="{ 'text-danger': userError }">User</label>
            <input
              type="text"
              id="user"
              v-model="user"
              class="form-control"
              :class="{ 'is-invalid': userError }"
              placeholder="Enter your username"
            />
            <div v-if="userError" class="invalid-feedback">Required field</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label" :class="{ 'text-danger': emailError }"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              :class="{ 'is-invalid': emailError }"
              placeholder="Enter your email"
            />
            <div v-if="emailError" class="invalid-feedback">Required field</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label" :class="{ 'text-danger': passwordError }"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              :class="{ 'is-invalid': passwordError }"
              placeholder="Enter your password"
            />
            <div v-if="passwordError" class="invalid-feedback">Required field</div>
          </div>
          <button type="submit" class="btn btn-primary w-100">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-if="!loading">Register</span>
          </button>
        </form>
        <!-- Login Link -->
        <div class="text-center mt-3">
          <small>Already Registered? <a href="/auth/login">Login</a></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerUser } from '@/services/api/auth'
import createMessageFromError from '@/utils/createMessageFromError'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const user = ref('')
const email = ref('')
const password = ref('')
const userError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)
const loading = ref(false)

const handleRegister = async () => {
  userError.value = !user.value
  emailError.value = !email.value
  passwordError.value = !password.value

  if (!userError.value && !emailError.value && !passwordError.value) {
    loading.value = true
    try {
      const payload = {
        user: {
          email: email.value,
          password: password.value,
          username: user.value,
        },
      }
      const response = await registerUser(payload)
      toast.success(`User registered successfully: Welcome, ${response.user.username}!`)
      router.push('/')
    } catch (error: any) {
      toast.error(createMessageFromError(error))
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}
</style>

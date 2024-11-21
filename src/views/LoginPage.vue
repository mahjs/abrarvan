<template>
  <div class="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
    <div class="card shadow-sm" style="width: 400px">
      <div class="card-body">
        <h2 class="text-center mb-4">LOGIN</h2>
        <!-- Login Failed Message -->
        <div v-if="loginError" class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Login Failed!</strong> User name and/or Password is invalid
        </div>
        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
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
            <span v-if="!loading">Login</span>
            <!-- You can replace "Login" with "Register" for register -->
          </button>
        </form>
        <!-- Register Link -->
        <div class="text-center mt-3">
          <small>Don't have an account? <a href="/auth/register">Register Now</a></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginUser } from '@/services/api/auth'
import createMessageFromError from '@/utils/createMessageFromError'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const email = ref('')
const password = ref('')
const emailError = ref(false)
const passwordError = ref(false)
const loginError = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  emailError.value = !email.value
  passwordError.value = !password.value

  if (!emailError.value && !passwordError.value) {
    loading.value = true
    try {
      const payload = {
        user: {
          email: email.value,
          password: password.value,
        },
      }
      const response = await loginUser(payload)
      // Store token manually if not handled by the interceptor
      localStorage.setItem('token', response.user.token)

      // Navigate to the dashboard
      toast.success('Your successfully logged in.')
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

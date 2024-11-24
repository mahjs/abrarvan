import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)

  const withLoading = async (callback: () => Promise<any>) => {
    loading.value = true
    try {
      await callback()
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    withLoading,
  }
}

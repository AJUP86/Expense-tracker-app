import { defineStore } from 'pinia'
import apiClient from '@/services/apiService'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  const fetchProfile = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/auth/profile')
      user.value = response.data
    } catch (err) {
      console.error('Failed to fetch profile:', err)
      user.value = null
      error.value = err.response?.data?.message || 'Unable to fetch profile.'
    } finally {
      isLoading.value = false
    }
  }

  // Action to logout
  const logout = async () => {
    isLoading.value = true
    error.value = null
    try {
      await apiClient.get('/auth/logout')
      user.value = null
    } catch (err) {
      console.error('Logout failed:', err)
      error.value = err.response?.data?.message || 'Unable to logout.'
    } finally {
      isLoading.value = false
    }
  }

  const initializeAuth = async () => {
    await fetchProfile()
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    fetchProfile,
    logout,
    initializeAuth
  }
})

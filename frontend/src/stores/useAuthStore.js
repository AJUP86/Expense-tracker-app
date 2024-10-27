import { defineStore } from 'pinia'
import apiClient from '@/services/apiService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    async fetchUser() {
      try {
        const response = await apiClient.get('/auth/profile', {
          headers: {
            'Cache-Control': 'no-cache' // Prevent caching
          }
        })
        this.user = response.data
      } catch {
        this.user = null
      }
    },
    async logout() {
      await apiClient.get('auth/logout')
      this.user.null
    }
  }
})

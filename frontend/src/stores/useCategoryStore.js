import { defineStore } from 'pinia'
import apiClient from '@/services/apiService'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Creates a new category and returns the created category data.
   * @param {Object} categoryData
   * @returns {Object} The created category data
   */

  const createCategory = async (categoryData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/categories', categoryData)
      return response.data
    } catch (err) {
      error.value = 'Failed to create category'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    createCategory
  }
})

import { defineStore } from 'pinia'
import apiClient from '@/services/apiService'
import { ref, computed } from 'vue'

export const useBudgetStore = defineStore('budget', () => {
  const budgets = ref([])
  const currentBudget = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const totalBudgets = computed(() => budgets.value.length)
  const selectedBudget = computed(() => currentBudget.value)

  const fetchBudgets = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/budgets')
      budgets.value = response.data
    } catch (err) {
      console.error('Failed to fetch budgets:', err)
      error.value = err.response?.data?.message || 'Unable to fetch budgets.'
    } finally {
      isLoading.value = false
    }
  }

  const createBudget = async (budgetData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/budgets', budgetData)
      budgets.value.push(response.data)
    } catch (err) {
      console.error('Failed to create budget:', err)
      error.value = err.response?.data?.message || 'Unable to create budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchBudgetById = async (budgetId) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/budgets/${budgetId}`)
      currentBudget.value = {
        ...response.data,
        categories: Array.isArray(response.data.categories) ? response.data.categories : []
      }
    } catch (err) {
      console.error('Failed to fetch budget:', err)
      error.value = err.response?.data?.message || 'Unable to fetch budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateBudget = async (budgetId, updatedData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.put(`/budgets/${budgetId}`, updatedData)
      const index = budgets.value.findIndex((budget) => budget.budget_id === budgetId)
      if (index !== -1) {
        budgets.value[index] = response.data
      }
    } catch (err) {
      console.error('Failed to update budget:', err)
      error.value = err.response?.data?.message || 'Unable to update budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteBudget = async (budgetId) => {
    isLoading.value = true
    error.value = null
    try {
      await apiClient.delete(`/budgets/${budgetId}`)
      budgets.value = budgets.value.filter((budget) => budget.budget_id !== budgetId)
    } catch (err) {
      console.error('Failed to delete budget:', err)
      error.value = err.response?.data?.message || 'Unable to delete budget.'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Adds a new category to the current budget's categories array.
   * @param {Object} category - The category to add.
   */
  const addCategoryToCurrentBudget = async (category) => {
    if (currentBudget.value && Array.isArray(currentBudget.value.categories)) {
      currentBudget.value.categories.push(category)
    } else {
      console.warn('Cannot add category: currentBudget or categories array is not defined.')
      // Optionally, you can refetch the budget to ensure data consistency
      await fetchBudgetById(category.budgetId)
    }
  }

  return {
    budgets,
    currentBudget,
    isLoading,
    error,
    totalBudgets,
    selectedBudget,
    fetchBudgets,
    createBudget,
    fetchBudgetById,
    updateBudget,
    deleteBudget,
    addCategoryToCurrentBudget
  }
})
